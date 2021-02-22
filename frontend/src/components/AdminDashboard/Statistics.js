import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { VictoryPie } from 'victory-pie'

const useStyles = makeStyles(() => ({
  body: {
    width: "70%",
    maxWidth: "1300px",
    margin: "80px auto",
    minHeight: "60vh",
    display: 'flex',
    flexWrap: 'wrap',
    gap: '3.4rem',
    '& .VictoryContainer': {
      width: '30% !important'
    }
  }
}));

export default function AdminStatistics() {
  const classes = useStyles();

  const [state, setState] = useState({
    logged: true,
  });
  return (
    <div className={classes.body}>
      <VictoryPie
        data={[
          { x: "Product 1", y: 121 },
          { x: "Product 2", y: 523 },
          { x: "Product 3", y: 55 }
        ]}
      />
      <VictoryPie
        data={[
          { x: "Product 4", y: 35 },
          { x: "Product 5", y: 21 },
          { x: "Product 6", y: 55 }
        ]}
      />
      <VictoryPie
        data={[
          { x: "Product 7", y: 53 },
          { x: "Product 8", y: 50 },
          { x: "Product 9", y: 31 }
        ]}
      />
    </div>
  );
}
