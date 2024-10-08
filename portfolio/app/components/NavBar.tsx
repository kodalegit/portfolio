import { Button } from "@/app/components/ui/button";
import FillGitHubIcon from "./icons/FillGitHubIcon";
import EmailIcon from "./icons/EmailIcon";
import LinkedInIcon from "./icons/LinkedInIcon";

function NavBar() {
  return (
    <nav className="backdrop-blur-sm w-full fixed top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="ml-14 lg:ml-10 flex items-center space-x-4">
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
              className="bg-transparent border-green-500 hover:bg-green-500 text-green-500"
            >
              <a
                target="_blank"
                rel="noopener"
                href="https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com/resume-KxQKINtSocQ4GCykzw9V4DkQLci7ku.pdf"
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
