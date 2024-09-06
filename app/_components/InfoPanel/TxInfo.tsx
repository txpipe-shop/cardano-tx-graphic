"use client";
import { Accordion, AccordionItem, Card } from "@nextui-org/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { type ChangeEvent, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Input } from "~/app/_components";
import { GraphicalContext } from "~/app/_contexts";
import {
  TX_URL_PARAM,
  getTransaction,
  handleCopy,
  trimString,
} from "~/app/_utils";
import CopyIcon from "~/public/copy.svg";
import { AssetCard } from "./AssetCard";

export const TxInfo = () => {
  const [name, setName] = useState("");
  const { transactions, setTransactionBox } = useContext(GraphicalContext)!;
  const searchParams = useSearchParams();
  const selectedTxHash = searchParams.get(TX_URL_PARAM);
  const selectedTx = getTransaction(transactions)(selectedTxHash || "");

  useEffect(() => {
    const selectedTx = getTransaction(transactions)(selectedTxHash || "");
    setName(selectedTx?.alias || "");
  }, [selectedTxHash, transactions]);

  if (!selectedTx) return null;
  const {
    txHash,
    fee,
    inputsUTXO,
    outputsUTXO,
    mint,
    scriptsSuccessful,
    blockHash,
    blockTxIndex,
    blockHeight,
    blockAbsoluteSlot,
    withdrawals,
    metadata,
    size,
  } = selectedTx;

  const totalOutput: bigint = outputsUTXO.reduce((acc, output) => {
    const lovelace = output.assets.find(
      (asset) => asset.assetName === "lovelace",
    );
    if (!lovelace) return acc;

    return acc + BigInt(lovelace.amount);
  }, BigInt(0));

  const msg = (() => {
    const item = metadata?.find(
      (entry: { label: string }) => entry.label === "674",
    );
    if (item && item.jsonMetadata) {
      return item.jsonMetadata["msg"];
    }
    return "No metadata";
  })();

  const txTrim = trimString(txHash || "", 12);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSave = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length > 30) {
      toast.error("Alias name must be less than 30 characters");
      return;
    }
    setTransactionBox((prev) => {
      const newTransactions = prev.transactions.map((tx) =>
        tx.txHash === txHash ? { ...tx, alias: name } : tx,
      );

      return { ...prev, transactions: newTransactions };
    });
    toast.success("Transaction alias saved");
  };

  return (
    <Accordion selectionMode="multiple">
      <AccordionItem key="1" title="TxHash">
        <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
          {txTrim}
          <Image
            src={CopyIcon}
            alt="Copy"
            onClick={handleCopy(txHash)}
            className="cursor-pointer"
          />
        </Card>
      </AccordionItem>
      <AccordionItem key="2" title="Fee">
        <div className="flex flex-col gap-2">
          <AssetCard
            asset={{ assetName: "lovelace", policyId: "", amount: Number(fee) }}
          />
        </div>
      </AccordionItem>
      <AccordionItem key="3" title="Block">
        <Card className="m-1 flex flex-row bg-content2 px-5 py-2 shadow-none">
          <b>Slot:</b>&nbsp;
          <p>{blockAbsoluteSlot ?? "Unknown"}</p>
        </Card>
        <Card className="m-1 flex flex-row bg-content2 px-5 py-2 shadow-none">
          <b>Height:</b>&nbsp;
          <p>{blockHeight ?? "Unknown"}</p>
        </Card>
        {blockHash && (
          <Card className="m-1 flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
            <div className="flex">
              <b>Hash:</b>&nbsp;
              <p>{trimString(blockHash, 14)}</p>
            </div>
            <Image
              src={CopyIcon}
              alt="Copy"
              onClick={handleCopy(blockHash)}
              className="cursor-pointer"
            />
          </Card>
        )}
        <Card className="m-1 flex flex-row bg-content2 px-5 py-2 shadow-none">
          <b>Index:</b>&nbsp;
          <p>{blockTxIndex ?? "Unknown"}</p>
        </Card>
      </AccordionItem>
      <AccordionItem key="4" title="Slot">
        <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
          {blockAbsoluteSlot ?? "Unknown"}
        </Card>
      </AccordionItem>
      <AccordionItem key="5" title="Size">
        <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
          {size ?? "Unknown"}
        </Card>
      </AccordionItem>
      <AccordionItem key="6" title="Outputs Count">
        <Card className="fl ex-row flex justify-between bg-content2 px-5 py-2 shadow-none">
          {outputsUTXO.length}
        </Card>
      </AccordionItem>
      <AccordionItem key="7" title="Total Output Sum">
        <div className="flex flex-col gap-2">
          <AssetCard
            asset={{ assetName: "lovelace", policyId: "", amount: totalOutput }}
          />
        </div>
      </AccordionItem>
      <AccordionItem key="8" title="Inputs Count">
        <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
          {inputsUTXO.length}
        </Card>
      </AccordionItem>
      <AccordionItem key="9" title="Withdrawals">
        <div className="flex flex-col gap-2">
          {withdrawals ? (
            withdrawals.map((withdrawal, index) => (
              <Card
                key={index}
                className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none"
              >
                <b>Address:</b>&nbsp;
                <p>{withdrawal.address}</p>
                <b>Amount:</b>&nbsp;
                <p>{withdrawal.amount}</p>
              </Card>
            ))
          ) : (
            <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
              No withdrawals
            </Card>
          )}
        </div>
      </AccordionItem>
      <AccordionItem key="10" title="Metadata">
        <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
          {msg}
        </Card>
      </AccordionItem>
      <AccordionItem key="11" title="Minting & Burning">
        <div className="flex flex-col gap-2">
          {mint.length ? (
            mint.map((asset, index) => (
              <AssetCard key={index} asset={asset} isMintBurn />
            ))
          ) : (
            <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
              No minting or burning
            </Card>
          )}
        </div>
      </AccordionItem>
      <AccordionItem key="12" title="Scripts Successful">
        <div className="flex flex-col gap-2">
          <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
            {scriptsSuccessful ? "True" : "False"}
          </Card>
        </div>
      </AccordionItem>
      <AccordionItem key="13" title="Alias" className="m-0">
        <form onSubmit={handleSave} className="flex justify-around">
          <Input
            inputSize="small"
            name="Name your transaction"
            onChange={handleChange}
            value={name}
          />
          <Button type="submit" className="h-10 text-sm">
            Save
          </Button>
        </form>
      </AccordionItem>
    </Accordion>
  );
};
