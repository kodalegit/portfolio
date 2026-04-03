import { Button } from "@/app/components/ui/button";
import FillGitHubIcon from "./icons/FillGitHubIcon";
import EmailIcon from "./icons/EmailIcon";
import LinkedInIcon from "./icons/LinkedInIcon";

function NavBar() {
  return (
    <nav className="backdrop-blur-md w-full fixed top-0 z-10 border-b border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="ml-14 lg:ml-10 flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/victorkimani77"
              target="_blank"
              rel="noopener"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com/kodalegit"
              target="_blank"
              rel="noopener"
            >
              <FillGitHubIcon />
            </a>
            <a href="mailto:victorkimani77@gmail.com">
              <EmailIcon />
            </a>
          </div>
          <div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="bg-slate-950/70 border-slate-700 text-slate-300 text-xs tracking-widest uppercase hover:bg-slate-900/90 hover:border-green-300 hover:text-green-300 transition-all duration-300 backdrop-blur-sm"
            >
              <a
                target="_blank"
                rel="noopener"
                href="https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com/Resume.pdf"
              >
                Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
