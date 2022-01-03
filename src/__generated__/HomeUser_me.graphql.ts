/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeUser_me = {
    readonly email: string | null;
    readonly collectorLevel: number | null;
    readonly bio: string | null;
    readonly " $refType": "HomeUser_me";
};
export type HomeUser_me$data = HomeUser_me;
export type HomeUser_me$key = {
    readonly " $data"?: HomeUser_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"HomeUser_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeUser_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "collectorLevel",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bio",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '9ad0d5f348b03a488874282fff472f35';
export default node;
