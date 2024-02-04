import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <footer className="checkoutFooter">
          <div className="container">
            <ul className="copyright-list">
              <li>
                Copyright © 2023 Mukesh All rights reserved.
              </li>
              <li>
                Powered by
                <Link href={"#"} target="_blank">
                  <span>
                    <strong> Mukesh </strong>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </footer>
    )
}
export default Footer;