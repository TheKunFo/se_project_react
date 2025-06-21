import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <span>Developed by Name Andrian Apriadi</span>
      <span>{currentYear}</span>
    </footer>
  );
}

export default Footer;
