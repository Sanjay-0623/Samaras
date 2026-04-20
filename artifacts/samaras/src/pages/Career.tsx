import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaUser, FaEnvelope, FaCloudUploadAlt, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import PageTransition from "@/components/PageTransition";

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "YOUR_CLOUDINARY_CLOUD_NAME";
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "YOUR_CLOUDINARY_UPLOAD_PRESET";

const DEPARTMENTS = [
  "Kitchen / Chef",
  "Service / Waitstaff",
  "Management",
  "Housekeeping",
  "Delivery",
  "Other",
];

type Status = "idle" | "uploading" | "sending" | "success" | "error";

export default function Career() {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [experience, setExperience] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 10 * 1024 * 1024) {
      setErrorMsg("Resume must be under 10 MB.");
      setStatus("error");
      return;
    }
    setResumeFile(file);
    setErrorMsg("");
    if (status === "error") setStatus("idle");
  };

  const uploadResume = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
      { method: "POST", body: fd }
    );
    if (!res.ok) throw new Error("Resume upload failed.");
    const data = await res.json();
    if (!data.secure_url) throw new Error("Resume upload failed.");
    return data.secure_url as string;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setErrorMsg("Please attach your resume.");
      setStatus("error");
      return;
    }
    setErrorMsg("");
    try {
      setStatus("uploading");
      const resumeUrl = await uploadResume(resumeFile);

      setStatus("sending");
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name,
          email,
          department,
          experience,
          resume: resumeUrl,
          to_email: "support@samarasveg.com",
          subject: `New Career Application - ${name}`,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setStatus("success");
      alert("Application sent successfully!");
      formRef.current?.reset();
      setName(""); setEmail(""); setDepartment(DEPARTMENTS[0]); setExperience(""); setResumeFile(null);
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(msg);
      setStatus("error");
      alert("Failed to send application. Please try again or call us directly.");
    }
  };

  const isBusy = status === "uploading" || status === "sending";

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16 relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-5 mt-12"
          >
            <FaBriefcase className="text-primary text-xs" />
            <span className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">Career</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-5"
          >
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-light"
          >
            Apply for opportunities at Samara's Veg
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-10 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)]"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <Field label="Full Name" icon={<FaUser />}>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="form-input"
                  data-testid="input-name"
                />
              </Field>

              {/* Email */}
              <Field label="Email" icon={<FaEnvelope />}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="form-input"
                  data-testid="input-email"
                />
              </Field>

              {/* Department */}
              <Field label="Department">
                <select
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="form-input"
                  data-testid="select-department"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d} className="bg-[#0c0c0c] text-white">
                      {d}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Experience */}
              <Field label="Experience">
                <input
                  type="text"
                  required
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g. 3 years in fine-dining kitchen"
                  className="form-input"
                  data-testid="input-experience"
                />
              </Field>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-[0.18em] mb-2">
                Upload Resume
              </label>
              <label
                htmlFor="resume"
                className="group flex items-center justify-between gap-4 cursor-pointer rounded-xl border border-dashed border-white/15 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/40 transition-all px-5 py-5"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <FaCloudUploadAlt className="text-lg" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {resumeFile ? resumeFile.name : "Click to upload your resume"}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">PDF, DOC, DOCX · Max 10 MB</p>
                  </div>
                </div>
                {resumeFile && <FaCheckCircle className="text-primary shrink-0" />}
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="hidden"
                  data-testid="input-resume"
                />
              </label>
            </div>

            {/* Error message */}
            {status === "error" && errorMsg && (
              <p className="text-red-400 text-sm text-center" data-testid="text-error">{errorMsg}</p>
            )}

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isBusy}
                data-testid="button-submit"
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-primary text-black font-bold py-4 text-sm uppercase tracking-[0.2em] hover:bg-primary/90 active:scale-[0.99] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "uploading" && <>Uploading resume…</>}
                {status === "sending" && <>Sending application…</>}
                {!isBusy && (
                  <>
                    <FaPaperPlane className="text-xs" />
                    Submit Application
                  </>
                )}
              </button>
              <p className="text-white/30 text-xs text-center mt-4 font-light">
                Applications are sent securely to our HR team at support@samarasveg.com
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Local styles for inputs */}
      <style>{`
        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 0.75rem;
          padding: 0.85rem 1rem;
          color: #fff;
          font-size: 0.95rem;
          font-weight: 300;
          outline: none;
          transition: border-color .2s, background .2s, box-shadow .2s;
        }
        .form-input::placeholder { color: rgba(255,255,255,0.35); font-weight: 300; }
        .form-input:focus {
          border-color: rgba(255,122,0,0.55);
          background: rgba(255,255,255,0.05);
          box-shadow: 0 0 0 3px rgba(255,122,0,0.10);
        }
        select.form-input { appearance: none; background-image: linear-gradient(45deg, transparent 50%, #FF7A00 50%), linear-gradient(135deg, #FF7A00 50%, transparent 50%); background-position: calc(100% - 18px) center, calc(100% - 13px) center; background-size: 5px 5px, 5px 5px; background-repeat: no-repeat; padding-right: 2.5rem; }
      `}</style>
    </PageTransition>
  );
}

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-white/70 text-xs font-semibold uppercase tracking-[0.18em] mb-2">
        {icon && <span className="text-primary/70 mr-2 inline-block align-middle">{icon}</span>}
        {label}
      </label>
      {children}
    </div>
  );
}
