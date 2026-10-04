import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, CheckCircle2, Loader2, Mail, Phone, X } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONES } from "../contact-details";

type FormStatus = "idle" | "submitting" | "success" | "error";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setStatus("idle");
      setErrorMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      honeypot: String(formData.get("honeypot") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  };

  return createPortal(
    <div className="contact-modal-root" role="presentation">
      <button
        type="button"
        className="contact-modal-backdrop"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        className="contact-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button type="button" className="contact-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} strokeWidth={2.5} />
        </button>

        {status === "success" ? (
          <div className="contact-modal-success">
            <CheckCircle2 size={40} className="text-brand" strokeWidth={2} />
            <h2 id={titleId} className="contact-modal-title">
              Message sent
            </h2>
            <p id={descriptionId} className="contact-modal-subtitle">
              Thanks for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
            <button type="button" className="landing-btn-primary contact-modal-submit" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id={titleId} className="contact-modal-title">
              Describe your plan
            </h2>
            <p id={descriptionId} className="contact-modal-subtitle">
              Tell us what you want to build. We&apos;ll get back to you at the email you provide.
            </p>
            <div className="contact-modal-direct">
              <p className="contact-modal-direct-row">
                <Phone size={14} strokeWidth={2.25} aria-hidden />
                {CONTACT_PHONES.map((phone, index) => (
                  <span key={phone.tel} className="contact-modal-direct-phones">
                    {index > 0 ? <span aria-hidden> / </span> : null}
                    <a href={`tel:${phone.tel}`}>{phone.display}</a>
                  </span>
                ))}
              </p>
              <p className="contact-modal-direct-row">
                <Mail size={14} strokeWidth={2.25} aria-hidden />
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
            </div>

            <form className="contact-modal-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="honeypot"
                className="contact-modal-honeypot"
                tabIndex={-1}
                autoComplete="off"
              />

              <label className="contact-modal-field">
                <span className="contact-modal-label">Your name</span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Jane Smith"
                  className="contact-modal-input"
                  disabled={status === "submitting"}
                />
              </label>

              <label className="contact-modal-field">
                <span className="contact-modal-label">
                  Email <span className="contact-modal-required">*</span>
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  aria-required="true"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="contact-modal-input"
                  disabled={status === "submitting"}
                />
              </label>

              <label className="contact-modal-field">
                <span className="contact-modal-label">What&apos;s the plan?</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="What are you building, who's it for, and what does success look like?"
                  className="contact-modal-input contact-modal-textarea"
                  disabled={status === "submitting"}
                />
              </label>

              {status === "error" && (
                <p className="contact-modal-error" role="alert">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                className="landing-btn-primary contact-modal-submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" strokeWidth={2.5} />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
