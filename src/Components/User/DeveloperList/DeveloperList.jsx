import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import "./DeveloperList.css";
import { allUsers } from "../../../Api/UserApi";
import { paginationCount } from "../../../Api/UserApi";
import Pagination from "@material-ui/lab/Pagination";

function DeveloperList() {
  const [allUSers, setAllUSers] = useState([]);

  const [counts, setCounts] = useState(null);
  useEffect(() => {
    paginationCount((count) => {
      console.log(count);
      let result = count / 10;
      console.log(result);
      result = result.toString();
      result = result.charAt(0);
      console.log(result);
      result = Number(result) + 1;
      console.log("kjjjjjjjjjjjjjjjjj");
      console.log(result);
      setCounts(result);
    });
    allUsers((users) => {
      setAllUSers(users);
    }, 9);
  }, []);
  const nextPagination = (e) => {
    let result = e.target.innerHTML;
    result = result.charAt(0);
    result = result * 9;
    allUsers((users) => {
      setAllUSers(users);
    }, result);
  };
  return (
    <div>
      {allUSers.map((element, i) => {
        return (
          <Card className="developer-card shadow" key={i}>
            <Card.Body>
              <div className="developer-list-top">
                <div className="profile-img-container">
                  <img
                    src={element.profileImage}
                    alt="img"
                    className="developer-card-profile-img "
                  />
                </div>
                <div>
                  <p className="developer-card-profile-name">{element.name}</p>
                  <p>{element.domain}</p>
                  <p className="state-class">{element.state}</p>
                </div>
                <div className="ms-auto">
                  <Button type="button" value="" className="invite-button ">
                    Invite to a job
                  </Button>
                </div>
              </div>
              <div className="developer-list-second mt-2">
                <p>
                  {element.amount}
                  <span className="state-class me-5">/hrs</span>{" "}
                </p>
                <p>
                  700<span className="state-class me-5">earned</span>{" "}
                </p>
              </div>
              <div className="developer-list-third mt-2">
                <p>{element.description}</p>
              </div>
            </Card.Body>
          </Card>
        );
      })}
      <div style={{ display: "block", padding: 30 }}>
        <Pagination count={counts} onClick={nextPagination} />
      </div>
    </div>
  );
}

export default DeveloperList;
