import { z } from "zod";

const egyptPhoneRegex = /^(\+?20|0)?1[0125][0-9]{8}$/;

export const bookingSchema = z.object({
  fullName: z.string().trim().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  phone: z.string().trim().regex(egyptPhoneRegex, "اكتب رقم موبايل مصري صحيح"),
  address: z.string().trim().min(1, "العنوان مطلوب"),
  city: z.string().trim().min(1, "المدينة مطلوبة"),
  serviceId: z.string().trim().optional().or(z.literal("")),
  patientAge: z.preprocess(
    (value) => {
      if (value === "" || value === null || Number.isNaN(value)) return undefined;
      return Number(value);
    },
    z.number().int().min(0).max(130).optional(),
  ),
  patientCondition: z.string().trim().min(1, "حالة المريض مطلوبة"),
  preferredDate: z.string().trim().min(1, "التاريخ مطلوب"),
  preferredTime: z.string().trim().min(1, "الوقت مطلوب"),
  notes: z.string().trim().optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type BookingFormInput = z.input<typeof bookingSchema>;
