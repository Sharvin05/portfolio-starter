"use client";

import { ui } from "@content";
import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ContactRequest, ContactResponse } from "@/lib/contact/api";
import { LIMITS, validateContact, type ContactErrors, type ContactField, type ContactInput } from "@/lib/contact/validate";
import { ease } from "@/lib/motion";
import { FormAlert } from "./components/FormAlert";
import { FormField } from "./components/FormField";
import { Button } from "@/components/Button";
import { SuccessMessage } from "./components/SuccessMessage";
import { TurnstileWidget } from "./components/TurnstileWidget";
import styles from "./styles.module.scss";

export interface ContactFormCopy {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  sendAnother: string;
  verifyPrompt: string;
}

interface ContactFormProps {
  copy: ContactFormCopy;
  turnstileSiteKey?: string;
}

type Status = "idle" | "sending" | "success";

const EMPTY: ContactInput = { name: "", email: "", message: "" };
const FIELD_IDS: Record<ContactField, string> = { name: "contact-name", email: "contact-email", message: "contact-message" };

/** Moves focus to the first field with an error, in form order. */
function focusFirstError(errors: ContactErrors): void {
  const first = (["name", "email", "message"] as const).find((f) => errors[f]);
  if (first) document.getElementById(FIELD_IDS[first])?.focus();
}

function isContactResponse(value: unknown): value is ContactResponse {
  return typeof value === "object" && value !== null && typeof (value as { ok?: unknown }).ok === "boolean";
}

export function ContactForm({ copy, turnstileSiteKey }: ContactFormProps) {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [alert, setAlert] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);

  // Warn before leaving with an unsent message
  const dirty = status !== "success" && Object.values(values).some((v) => v.trim() !== "");
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    addEventListener("beforeunload", onBeforeUnload);
    return () => removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const update = (field: ContactField) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setAlert(null);

    const check = validateContact(values);
    if (!check.ok) {
      setErrors(check.errors);
      focusFirstError(check.errors);
      return;
    }
    if (!token) {
      setAlert(copy.verifyPrompt);
      return;
    }

    setStatus("sending");
    const payload: ContactRequest = { ...check.data, token, company: honeypot };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json: unknown = await res.json();
      if (isContactResponse(json) && json.ok) {
        setStatus("success");
        setValues(EMPTY);
        return;
      }
      setAlert(isContactResponse(json) && !json.ok ? json.error : ui.contactForm.sendFailed);
      if (isContactResponse(json) && !json.ok && json.fields) {
        setErrors(json.fields);
        focusFirstError(json.fields);
      }
    } catch {
      setAlert(ui.contactForm.offline);
    }
    // Turnstile tokens work once, so get a fresh one for the next attempt
    setToken(null);
    setResetSignal((n) => n + 1);
    setStatus("idle");
  };

  const restart = () => {
    setStatus("idle");
    setErrors({});
    setAlert(null);
    setToken(null);
    setResetSignal((n) => n + 1);
  };

  return (
    <div className={styles.root}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div key="success" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }}>
            <SuccessMessage title={copy.successTitle} body={copy.successBody} actionLabel={copy.sendAnother} onAction={restart} />
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className={styles.form}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className={styles.row}>
              <FormField
                id="contact-name"
                label={copy.nameLabel}
                placeholder={copy.namePlaceholder}
                autoComplete="name"
                maxLength={LIMITS.name.max}
                value={values.name}
                onChange={update("name")}
                error={errors.name}
              />
              <FormField
                id="contact-email"
                type="email"
                label={copy.emailLabel}
                placeholder={copy.emailPlaceholder}
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                maxLength={LIMITS.email.max}
                value={values.email}
                onChange={update("email")}
                error={errors.email}
              />
            </div>
            <FormField
              id="contact-message"
              multiline
              autoComplete="off"
              label={copy.messageLabel}
              placeholder={copy.messagePlaceholder}
              maxLength={LIMITS.message.max}
              value={values.message}
              onChange={update("message")}
              error={errors.message}
            />
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="contact-company">{ui.contactForm.honeypotLabel}</label>
              <input id="contact-company" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>
            {alert ? <FormAlert message={alert} /> : null}
            <div className={styles.footer}>
              <TurnstileWidget siteKey={turnstileSiteKey} onToken={setToken} resetSignal={resetSignal} />
              <Button type="submit" variant="primary" icon="send" busy={status === "sending"}>
                {status === "sending" ? copy.sending : copy.submit}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
