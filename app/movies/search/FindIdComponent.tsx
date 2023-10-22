"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Select, SelectItem } from "@nextui-org/select";

const externalSources = [
  "imdb_id",
  "facebook_id",
  "instagram_id",
  "tvdb_id",
  "tiktok_id",
  "twitter_id",
  "wikidata_id",
  "youtube_id",
];

type Props = {
  findIdAction: (formData: FormData) => void;
  externalId?: string;
  externalSource?: string;
};

export const FindIdComponent = ({
  findIdAction,
  externalId,
  externalSource = "imdb_id",
}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card isBlurred shadow="sm">
        <CardBody className="p-2">
          <Button onPress={onOpen} color="primary">
            Looking for a specific ID
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form action={findIdAction}>
              <ModalHeader className="flex flex-col gap-1">Find ID</ModalHeader>
              <ModalBody>
                <Select
                  label="Select an external source"
                  name="externalSource"
                  defaultSelectedKeys={[externalSource]}
                >
                  {externalSources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  autoFocus
                  placeholder="Enter ID"
                  name="externalId"
                  size="lg"
                  defaultValue={externalId}
                />
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary" onPress={onClose}>
                  Search
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
