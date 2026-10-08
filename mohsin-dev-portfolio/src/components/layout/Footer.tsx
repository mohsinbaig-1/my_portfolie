import { siteConfig } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="dashboard-footer" role="contentinfo">
      <div className="footer-identity">
        <span className="footer-mark">MB</span>
        <span>{siteConfig.name}</span>
      </div>
      <p>Unreal Engine 5 Developer</p>
      <p className="footer-message">Thanks for visiting! 👋<br />Let&apos;s build something amazing.</p>
      <small>© {year} {siteConfig.name}</small>
    </footer>
  );
}
