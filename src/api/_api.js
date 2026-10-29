'use server'

import { transporter, testConnection } from '../config/nodemailer';
import { TRAINING_CENTERS_NAMES } from '../constants';

export const sendEmail = async (data) => {

    const trainingCenterName = TRAINING_CENTERS_NAMES.find(center => center.id === data.training_center)?.name || 'Not specified';

    try {
        // Validate required fields - check for common required fields
        const hasRequiredFields = (data.full_name || data.first_name) && data.email && data.phone;
        if (!hasRequiredFields) {
            throw new Error('Missing required fields');
        }

        // Test SMTP connection first
        const isConnected = await testConnection();
        if (!isConnected) {
            throw new Error('SMTP connection failed. Please check your email configuration.');
        }

        // Dynamically generate HTML content based on the actual data structure
        const generateFormFieldsHTML = (formData) => {
            let fieldsHTML = '';
            
            // Common fields that might exist
            const fieldMappings = {
                full_name: 'Full Name',
                first_name: 'First Name',
                last_name: 'Last Name',
                email: 'Email',
                phone: 'Phone',
                course_name: 'Course/Package',
                training_center: 'Training Center',
                week_number_of_lessons: 'Week Number of Lessons',
                course_type: 'Course Type',
                order: 'Order',
                message: 'Message'
            };

            // Generate HTML for each field that exists in the data
            Object.keys(fieldMappings).forEach(key => {
                if (formData[key] !== undefined && formData[key] !== null && formData[key] !== '') {
                    let value = formData[key];
                    
                    // Special handling for training center
                    if (key === 'training_center') {
                        value = trainingCenterName;
                    }
                    
                    fieldsHTML += `<p style="font-size: 16px;"><strong>${fieldMappings[key]}:</strong> ${value}</p>`;
                }
            });

            return fieldsHTML;
        };

        // Send email directly using nodemailer
        const mailOptions = {
            from: `"Art House Contact Form" <${process.env.NEXT_NODEMAILER_EMAIL}>`,
            to: process.env.NEXT_NODEMAILER_EMAIL,
            replyTo: data.email,
            subject: `Contact form submission from ${data.full_name || data.first_name || 'Unknown'}`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                    <h2 style="color: #007BFF; text-align: center;">Contact Form Submission</h2>
                    <p style="font-size: 16px; line-height: 1.5; text-align: center;">You have a new contact form submission:</p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    ${generateFormFieldsHTML(data)}
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 14px; color: #555; text-align: center;">This message was sent from your website's contact form.</p>
                </div>
            `,
        };

        const result = await transporter.sendMail(mailOptions);
        return { success: true, message: 'Email sent successfully', messageId: result.messageId };

    } catch (error) {        
        let errorMessage = error.message;
        if (error.code === 'EAUTH') {
            errorMessage = 'Authentication failed. Please check your email credentials.';
        } else if (error.code === 'ECONNECTION') {
            errorMessage = 'Connection failed. Please check your internet connection and email server settings.';
        } else if (error.code === 'ETIMEDOUT') {
            errorMessage = 'Connection timed out. Please try again later.';
        }
        
        return { success: false, error: errorMessage, code: error.code };
    }
}

