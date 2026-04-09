import HeartIcon from "@/components/icons/heart";
import LocationIcon from "@/components/icons/location";

const Footer = () => {

  return (
    <footer className="mx-auto mb-24 w-full max-w-4xl px-6 md:mb-6 md:px-0">
      <div className="flex flex-col gap-2">

        <p className="flex items-center gap-1.5 font-cera text-sm text-muted-foreground">
          Designed & Made with <HeartIcon className="h-4 w-4" />
        </p>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
          <LocationIcon className="h-3.5 w-3.5" /> Guwahati, Assam, India
        </p>
        <p className="text-xs text-muted-foreground/60">
          &copy; {new Date().getFullYear()} Shiva Bhattacharjee. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
