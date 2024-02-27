import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { ModelType, SharedActionType } from "../lib/types";

export type ResourceEvent = {
  type: ModelType;
  id: number[];
  action: SharedActionType;
};

export const useWS = () => {
  const [event, setEvent] = useState<ResourceEvent | null>(null);

  useEffect(() => {
    socket.connect();

    socket.on("actions", (data: string) => {
      const action = JSON.parse(data);
      setEvent(action);
    });

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  const emitEvent = (action: ResourceEvent) => {
    socket.emit("actions", JSON.stringify(action));
  };

  return {
    socket,
    event,
    emitEvent,
  };
};
