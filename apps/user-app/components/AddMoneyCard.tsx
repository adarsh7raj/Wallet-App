"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { handleAddMoney } from "../app/lib/actions/onRamptransaction";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney =  () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [providerName, setProviderName] = useState("HDFC Bank");
  const [amount, setAmount] = useState<number>(0);
  
  // Getting session asynchronously outside the event handler


  // Click handler for the "Add Money" button
    return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(value) => {
            
              setAmount(Number(value)*100);
        
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            console.log(value);
            setRedirectUrl(SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || "");
            setProviderName(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button onClick={async function(){
            console.log(providerName);
           await handleAddMoney({amount,providerName});
           window.location.href = redirectUrl || "";
          }}>Add Money</Button>
        </div>
      </div>
    </Card>
  );
};
