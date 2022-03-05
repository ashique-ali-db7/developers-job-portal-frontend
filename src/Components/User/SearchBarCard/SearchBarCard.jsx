import React, { useState } from "react";
import { Card, Button, Collapse } from "react-bootstrap";
import "./SearchBarCard.css";
import { FaSistrix } from "react-icons/fa";

function SearchBarCard() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Card className="developer-card shadow">
        <Card.Body>
          <div className="box">
            <div className="search-form-conatainer">
              <form action="/" method="get">
                <label htmlFor="header-search">
                  <span className="visually-hidden">Search developers</span>
                </label>
                <input
                  type="text"
                  id="header-search"
                  placeholder="Search developers"
                  name="s"
                />

                <button type="submit" className="search-button">
                  {" "}
                  <span>
                    <FaSistrix />
                  </span>
                </button>
              </form>
            </div>
            <div className="search-form-conatainer2">
              <button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                className="filter-button"
              >
                {" "}
                <span>Filter</span>
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>

 <Collapse in={open}>
        <div id="" className="filter-div shadow">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </Collapse>

    </div>
  );
}

export default SearchBarCard;
