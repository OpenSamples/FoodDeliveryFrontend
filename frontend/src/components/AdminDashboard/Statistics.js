import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { VictoryPie } from 'victory-pie'
import axios from 'axios'

const useStyles = makeStyles(() => ({
  body: {
    maxWidth: "1300px",
    margin: "80px auto",
    minHeight: "60vh",
    display: 'flex',
    flexWrap: 'wrap',
    gap: '3.4rem',
    '& span': {
      width: '30% !important',
      border: '1px solid #ccc'
    },
    '& span h4': {
      color: 'rgba(0, 0, 0, 0.64)',
      borderBottom: '1px solid #ccc',
      textAlign: 'center',
      height: '40px'
    },
    '& .VictoryContainer': {
      height: 'calc(100% - 100px) !important'
    }
  }
}));

export default function AdminStatistics() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    bestSelling: [],
    mostProductsCategory: [],
    mostProfitableWeekday: []
  })

  React.useEffect( async () => {
    try {
      let statisticsData = await axios({
        method: 'get',
        url: '/api/statistics'
      })

      if(statisticsData.data.message && statisticsData.data.message === 'Successfully') {
        setState({
          ...state,
          bestSelling: statisticsData.data.data.bestSelling || [],
          mostProductsCategory: statisticsData.data.data.mostProductsCategory || [],
          mostProfitableWeekday: statisticsData.data.data.mostProfitableWeekday || []
        })
      } else {

      }
    } catch(e) {

    }
  }, [])

  return (
    <div className={classes.body}>
      {[{title: 'Most Profitable Weekday', name: 'mostProfitableWeekday'}, {title: 'Most Products in Category', name: 'mostProductsCategory'}, {title: 'Best Selling Products', name: 'bestSelling'}].map((data, idx) => {
        if(state[data.name].length) {
          return (
            <span key={idx}>
              <h4>{data.title}</h4>
              <VictoryPie
                colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                data={state[data.name]}
                padding={{ left: 100, right: 100 }}
              />
            </span>
          )
        }
      })}
      {/* <span>
        <h4>Most Profitable Weekday</h4>
        <VictoryPie
          colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
          data={[
            { x: "Product 1", y: 121 },
            { x: "Product 2", y: 523 },
            { x: "Product 3", y: 55 }
          ]}
          padding={{ left: 100, right: 100 }}
        />
      </span>
      <span>
        <h4>Most Products in Category</h4>
        <VictoryPie
          colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
          data={[
            { x: "Product 4", y: 35 },
            { x: "Product 5", y: 21 },
            { x: "Product 6", y: 55 }
          ]}
          padding={{ left: 100, right: 100 }}
        />
      </span>

      <span>
        <h4>Best Selling Products</h4>
        <VictoryPie
          colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
          data={[
            { x: "Product 7", y: 53 },
            { x: "Product 8", y: 50 },
            { x: "Product 9", y: 31 }
          ]}
          padding={{ left: 100, right: 100 }}
        />
      </span> */}
    </div>
  );
}
