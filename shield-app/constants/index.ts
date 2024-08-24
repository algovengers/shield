import email from "@/assets/icons/email.png";
<<<<<<< HEAD
=======
import cancel from "@/assets/icons/cancel.png";
import accept from "@/assets/icons/accept.png";
import phone from "@/assets/icons/phone.png";
import notifications from "@/assets/icons/notifications.png";
>>>>>>> 1d560c5 (something)
import education from "@/assets/icons/education.png";
import health from "@/assets/icons/health.png";
import licon from "@/assets/icons/licon.png";
import ricon from "@/assets/icons/ricon.png";
import eyecross from "@/assets/icons/eyecross.png";
import upload from "@/assets/icons/upload.png";
import google from "@/assets/icons/google.png";
import home from "@/assets/icons/home.png";
import lock from "@/assets/icons/lock.png";
import notibg from "@/assets/images/notibg.png";
import person from "@/assets/icons/person.png";
import eye from "@/assets/icons/eye.png";
import eyeHide from "@/assets/icons/eye-hide.png";
import profile from "@/assets/icons/profile.png";
import check from "@/assets/images/check.png";
import report from "@/assets/images/report.png";
import authlogo from "@/assets/images/authlogo.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import onboarding4 from "@/assets/images/onboarding4.png";
import signupbg from "@/assets/images/signupbg.png";
import sos from "@/assets/images/sos.png";
import sosx from "@/assets/images/sos-x.png";
import i1 from "@/assets/images/1.png";
import i2 from "@/assets/images/2.png";
import i3 from "@/assets/images/3.png";
import i4 from "@/assets/images/4.png";
import setup from "@/assets/images/setup.png";

export const images = {
  onboarding1,
  onboarding2,
  report,
  onboarding3,
  setup,
  onboarding4,
  signupbg,
  check,
  authlogo,
  sos,
  sosx,
  i1,
  i2,
  i3,
  notibg,
  i4,
};

export const categories = [
  {
    id: 1,
    image: images.i1,
    name: "education"
  },
  {
    id: 2,
    image: images.i2,
    name: "safety"
  },
  {
    id: 3,
    image: images.i3,
    name: "report"
  },
  {
    id: 4,
    image: images.i4,
    name: "health"
  },
]

export const icons = {
  eye,
  accept,
  cancel,
  licon,
  eyeHide,
  health,
  email,
  notifications,
  eyecross,
  google,
  ricon,
  home,
  lock,
  person,
  upload,
  education,
  profile,
};

export const Onboarding = [
  {
    id: 1,
    title: "Ensure Your Safety All Time",
    description: "Your personal safety net, always within reach.",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Report Crimes for Immediate Action",
    description: "Instant crime reporting for immediate action and justice.",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Empower Yourself with Knowledge",
    description: "Access educational resources to unlock your full potential.",
    image: images.onboarding3,
  },
  {
    id: 4,
    title: "Put Your Health as Priority",
    description: "Access vital healthcare resources to stay strong and healthy.",
    image: images.onboarding4,
  }
]

export const data = {
  Onboarding,
};