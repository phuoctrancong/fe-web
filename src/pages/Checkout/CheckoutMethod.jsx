import { Tabs } from "antd";
import React from "react";
import { useState } from "react";
import { MethodPayment } from "./checkkout-constants";
const { TabPane } = Tabs;
const CheckoutMethod = (props) => {
  const { methods } = props;
  const [tab, setTab] = useState();
  const changeTab = (activeKey) => {
    setTab(activeKey);
  };
  return (
    <Tabs defaultActiveKey="2" onChange={changeTab}>
      {methods?.map((e) => {
        return (
          <TabPane tab={e.label} key={e.key}>
            {e.methodCode === MethodPayment.CARD ? (
              <>{e.children}</>
            ) : (
              <>{e.children}</>
            )}
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default CheckoutMethod;
