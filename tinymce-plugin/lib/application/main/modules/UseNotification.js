import { useState, useEffect } from 'react';
export function useNotif() {
    var _a = useState(), notif = _a[0], setNotif = _a[1];
    useEffect(function () {
        if (!notif)
            return;
        var timeoutId = setTimeout(function () {
            setNotif(undefined);
        }, 2000);
        return function () {
            clearTimeout(timeoutId);
        };
    }, [notif]);
    return [notif, setNotif];
}
//# sourceMappingURL=UseNotification.js.map