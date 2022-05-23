import { useState, useCallback, useEffect } from "react";
import { useBetween } from "use-between";

const useShare = () => {
    const [login, setLogin] = useState(false); 
}


export const useSharedState = () => useBetween(useShare);