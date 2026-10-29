import nodemailer from 'nodemailer';
 
// Create transporter with better Gmail configuration
export const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false, // Use TLS instead of SSL
	auth: {
		user: process.env.NEXT_NODEMAILER_EMAIL,
		pass: process.env.NEXT_NODEMAILER_PW,
	},
	tls: {
		rejectUnauthorized: false,
		ciphers: 'SSLv3'
	},
	requireTLS: true,
	debug: process.env.NODE_ENV === 'development', // Enable debug output in development
	logger: process.env.NODE_ENV === 'development', // Enable logging in development
	connectionTimeout: 60000, // 60 seconds
	greetingTimeout: 30000, // 30 seconds
	socketTimeout: 60000, // 60 seconds
});

// Alternative configuration for better Gmail compatibility
export const createAlternativeTransporter = () => {
	return nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.NEXT_NODEMAILER_EMAIL,
			pass: process.env.NEXT_NODEMAILER_PW,
		},
		debug: process.env.NODE_ENV === 'development',
		logger: process.env.NODE_ENV === 'development',
	});
};

// Test the connection
export const testConnection = async () => {
	try {
		await transporter.verify();
		console.log('SMTP connection verified successfully');
		return true;
	} catch (error) {
		console.error('SMTP connection failed:', error);
		
		// Try alternative transporter
		try {
			const altTransporter = createAlternativeTransporter();
			await altTransporter.verify();
			console.log('Alternative SMTP connection verified successfully');
			return true;
		} catch (altError) {
			console.error('Alternative SMTP connection also failed:', altError);
			return false;
		}
	}
};
