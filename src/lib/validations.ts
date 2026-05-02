import { z } from "zod";

const egyptPhoneRegex = /^(\+?20|0)?1[0125][0-9]{8}$/;
const optionalEmail = z
  .string()
  .trim()
  .email("البريد الإلكتروني غير صحيح")
  .optional()
  .or(z.literal(""));

export const supportTicketSchema = z.object({
  fullName: z.string().trim().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  phone: z.string().trim().regex(egyptPhoneRegex, "اكتب رقم موبايل مصري صحيح"),
  email: optionalEmail,
  subject: z.string().trim().min(3, "موضوع الرسالة مطلوب"),
  message: z.string().trim().min(10, "الرسالة يجب ألا تقل عن 10 أحرف"),
});

export const contactMessageSchema = z.object({
  fullName: z.string().trim().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  phone: z.string().trim().regex(egyptPhoneRegex, "اكتب رقم موبايل مصري صحيح"),
  email: optionalEmail,
  message: z.string().trim().min(10, "الرسالة يجب ألا تقل عن 10 أحرف"),
});

export type SupportTicketInput = z.infer<typeof supportTicketSchema>;
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
