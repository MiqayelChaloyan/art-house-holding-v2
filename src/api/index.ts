'use server'

import axios from 'axios';

import { BASE_URL } from '@/src/constants/api';

import { Form } from '@/src/types/educational-center';
import { FormLarge, FormSmall } from '@/src/types/language';
import { sendEmail } from './_api';


// Language
// SEND CONTACT US
export const sendContactUsLanguage = async (contactUs: FormSmall) => {
    try {
        const emailResponse = await sendEmail(contactUs);

        const apiResponse = await axios.post(BASE_URL, null, {
            params: { contactUs },
            timeout: 10000
        });

        if (emailResponse.success && apiResponse.status === 200) {
            return { status: 200 };
        } else {
            const error = !emailResponse.success 
                ? emailResponse.error 
                : 'API request failed';
            return { status: 500, error };
        }
    } catch (error) {
        return { 
            status: 500, 
            error: error instanceof Error ? error.message : 'Unknown error' 
        };
    }
}

// SEND A REQUEST
export const sendRequest = async (formData: FormLarge, sendEmailForm: { week_number_of_lessons: string, course_type: string }) => {
    try {
        const emailData = {
            ...formData,
            week_number_of_lessons: sendEmailForm.week_number_of_lessons,
            course_type: sendEmailForm.course_type
        };
        const emailResponse = await sendEmail(emailData);
        
        const apiResponse = await axios.post(BASE_URL, null, {
            params: { formData },
            timeout: 10000
        });


        if (emailResponse.success && apiResponse.status === 200) {
            return { status: 200 };
        } else {
            const error = !emailResponse.success 
                ? emailResponse.error 
                : 'API request failed';
            return { status: 500, error };
        }
    } catch (error) {
        return { 
            status: 500, 
            error: error instanceof Error ? error.message : 'Unknown error' 
        };
    }
}

// Educational Center
// SEND CONTACT US
export const sendContactUsEducational = async (contactUs: Form) => {
    try {
        const emailResponse = await sendEmail(contactUs);
        
        const apiResponse = await axios.post(BASE_URL, null, {
            params: { contactUs },
            timeout: 10000
        });

        if (emailResponse.success && apiResponse.status === 200) {
            return { status: 200 };
        } else {
            const error = !emailResponse.success 
                ? emailResponse.error 
                : 'API request failed';
            return { status: 500, error };
        }
    } catch (error) {
        return { 
            status: 500, 
            error: error instanceof Error ? error.message : 'Unknown error' 
        };
    }
}


// Design
// SEND CONTACT US
export const sendContactUsDesign = async (contactUs: FormSmall) => {
    try {
        const emailResponse = await sendEmail(contactUs);

        const apiResponse = await axios.post(BASE_URL, null, {
            params: { contactUs },
            timeout: 10000
        });

        if (emailResponse.success && apiResponse.status === 200) {
            return { status: 200 };
        } else {
            const error = !emailResponse.success 
                ? emailResponse.error 
                : 'API request failed';
            return { status: 500, error };
        }
    } catch (error) {
        return { 
            status: 500, 
            error: error instanceof Error ? error.message : 'Unknown error' 
        };
    }
};

// SEND ORDER
export const sendOrderDesign = async (designFormData: any) => {
    try {
        const emailResponse = await sendEmail(designFormData);

        const apiResponse = await axios.post(BASE_URL, null, {
            params: { designFormData },
            timeout: 10000
        });

        if (emailResponse.success && apiResponse.status === 200) {
            return { status: 200 };
        } else {
            const error = !emailResponse.success 
                ? emailResponse.error 
                : 'API request failed';
            return { status: 500, error };
        }
    } catch (error) {
        return { 
            status: 500, 
            error: error instanceof Error ? error.message : 'Unknown error' 
        };
    }
};