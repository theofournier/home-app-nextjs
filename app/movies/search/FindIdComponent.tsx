"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

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
      <Button onPress={onOpen} color="primary">
        Specific ID
      </Button>
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
