"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Textarea } from "@/components/ui/Textarea";
import { SITE } from "@/lib/constants/site";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.message.trim()) {
    errors.message = "Please enter your message.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(true);
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="landing-section bg-[#0a0a0a] text-white"
    >
      <div className="section-container">
        <div className="section-divider landing-section-divider" aria-hidden="true" />

        <SectionHeading
          id="contact-heading"
          title="Contact Us"
          description="We'd love to hear from you. Get in touch with Grand Royal."
          className="section-heading-gap"
          titleClassName="md:text-5xl"
        />
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-12">
          <Card elevated className="rounded-3xl p-8 md:p-10">
            <h3 className="mb-8 text-3xl font-bold text-yellow-500">
              Get In Touch
            </h3>

            <address className="space-y-6 not-italic">
              <div>
                <h4 className="mb-2 font-bold text-white">Address</h4>
                <p className="text-gray-400">{SITE.contact.address}</p>
              </div>

              <div>
                <h4 className="mb-2 font-bold text-white">Phone</h4>
                <a
                  href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`}
                  className="text-gray-400 transition hover:text-yellow-500"
                >
                  {SITE.contact.phone}
                </a>
              </div>

              <div>
                <h4 className="mb-2 font-bold text-white">Email</h4>
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="text-gray-400 transition hover:text-yellow-500"
                >
                  {SITE.contact.email}
                </a>
              </div>

              <div>
                <h4 className="mb-2 font-bold text-white">Opening Hours</h4>
                <p className="text-gray-400">{SITE.contact.hours}</p>
              </div>
            </address>
          </Card>

          <Card elevated className="rounded-3xl p-8 md:p-10">
            <h3 className="mb-8 text-3xl font-bold text-yellow-500">
              Send a Message
            </h3>

            {isSubmitted && (
              <p
                role="status"
                aria-live="polite"
                className="mb-6 rounded-xl border border-green-700/50 bg-green-950/40 px-4 py-3 text-green-300"
              >
                Thank you for your message. Our team will get back to you soon.
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6"
              aria-label="Contact form"
            >
              <Input
                id="contact-name"
                name="name"
                type="text"
                label="Your Name"
                placeholder="Your Name"
                value={formData.name}
                error={errors.name}
                required
                autoComplete="name"
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />

              <Input
                id="contact-email"
                name="email"
                type="email"
                label="Your Email"
                placeholder="Your Email"
                value={formData.email}
                error={errors.email}
                required
                autoComplete="email"
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />

              <Textarea
                id="contact-message"
                name="message"
                label="Your Message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                error={errors.message}
                required
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    message: event.target.value,
                  }))
                }
              />

              <Button type="submit" fullWidth size="lg">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default Contact;
