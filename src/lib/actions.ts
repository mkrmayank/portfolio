"use server";

import * as z from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

interface ContactFormState {
  success: boolean;
  message?: string;
  error?: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
}

export async function sendContactMessage(
  data: z.infer<typeof contactFormSchema>
): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = validatedFields.data;

  // Simulate sending an email or saving to a database
  console.log("Received contact form submission:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  // In a real application, you would integrate with an email service (e.g., Resend, SendGrid)
  // or save the message to a database.

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate potential failure
  // if (Math.random() < 0.2) {
  //   return { success: false, error: "Simulated server error. Please try again." };
  // }

  return {
    success: true,
    message: "Message sent successfully! Thank you for reaching out.",
  };
}
