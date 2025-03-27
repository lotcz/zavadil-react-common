import {createContext} from "react";
import {BasicLocalization, Localization} from "zavadil-ts-common";

export const LocalizationContext = createContext<Localization>(new BasicLocalization());
