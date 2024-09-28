import { Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useState } from "react";
import { Button, Input } from "~/app/_components";
import { useConfigs, useGraphical, useUI } from "~/app/_contexts";
import { getCborFromHash, isEmpty, OPTIONS, ROUTES } from "~/app/_utils";
import TxPipeIcon from "~/public/txpipe_shop.svg";
import { NetSelector } from "../NetSelector";
import { setCBOR } from "./header.helper";

export const Header = () => {
  const router = useRouter();
  const { setLoading, setError } = useUI();
  const { transactions, setTransactionBox } = useGraphical();
  const { configs, updateConfigs } = useConfigs();
  const [raw, setRaw] = useState<string>(configs.query);
  const [toGo, setToGo] = useState<string>("");

  const changeRaw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRaw(e.target.value);
  };

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!raw) return;
    router.push(toGo);
    setLoading(true);
    if (configs.option === OPTIONS.HASH) {
      const { cbor } = await getCborFromHash(
        raw,
        configs.net,
        setError,
        setLoading,
      );
      await setCBOR(
        configs.net,
        cbor,
        transactions,
        setTransactionBox,
        setError,
        true,
      );
    } else {
      await setCBOR(
        configs.net,
        raw,
        transactions,
        setTransactionBox,
        setError,
        false,
      );
    }
    updateConfigs("query", raw);
    setLoading(false);
  }
  const changeSelectedOption = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!isEmpty(e.target.value))
      updateConfigs("option", e.target.value as OPTIONS);
  };

  const changeGoTo = (route: string) => () => {
    setToGo(route);
  };

  return (
    <header className="fixed left-0 top-0 box-border flex w-full flex-row items-center justify-between border-b-2 border-dashed border-b-gray-300 bg-white px-4 pb-4 pt-6 align-middle">
      <div className="flex flex-row items-center gap-4">
        <h3 className="flex items-center text-4xl text-gray-400">
          <Link href={ROUTES.HOME}>
            <span>Lace Anatomy</span>
          </Link>
        </h3>

        <Link
          href="https://txpipe.shop/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={TxPipeIcon}
            alt="TxPipe Shop Logo"
            width={110}
            className="m-auto"
          />
        </Link>
        <NetSelector network={configs.net} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-2/3 items-center justify-end gap-4"
      >
        <Input
          name="tx-input"
          value={raw}
          onChange={changeRaw}
          placeholder="Enter CBOR or hash for any Cardano Tx"
          startContent={
            <Select
              aria-label="Close"
              selectedKeys={[configs.option]}
              size="sm"
              className="w-1/3"
              onChange={changeSelectedOption}
              color="primary"
              labelPlacement="outside"
            >
              <SelectItem key={OPTIONS.HASH} value={OPTIONS.HASH}>
                Search by Hash
              </SelectItem>
              <SelectItem key={OPTIONS.CBOR} value={OPTIONS.CBOR}>
                Search by CBOR
              </SelectItem>
            </Select>
          }
        />
        <Button type="submit" onClick={changeGoTo(ROUTES.GRAPHER)}>
          Draw
        </Button>
        <Button type="submit" onClick={changeGoTo(ROUTES.DISSECT)}>
          Dissect
        </Button>
      </form>
    </header>
  );
};
