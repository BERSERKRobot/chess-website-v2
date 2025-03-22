"use server"

import { Resend } from "resend"

// Initialize Resend with your API key
// In production, use environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    // Validate the form data
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        message: "Please fill out all required fields",
      }
    }

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "Chess Instruction <chessinsd@resend.dev>",
      to: ["aaronkirkham1995@gmail.com"], // Account owner's email address
      subject: `Contact Form: ${formData.subject || "New Message"}`,
      reply_to: formData.email,
      html: `
        <div>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Subject:</strong> ${formData.subject || "N/A"}</p>
          <h3>Message:</h3>
          <p>${formData.message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return {
        success: false,
        message: "Failed to send your message. Please try again later.",
      }
    }

    return {
      success: true,
      message: "Your message has been sent successfully!",
      data,
    }
  } catch (error) {
    console.error("Error in sendContactEmail:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}

