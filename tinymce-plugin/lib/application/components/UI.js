import React, { useState } from 'react';
export default function UI(_a) {
    var resolve = _a.resolve;
    var _b = useState(0), number = _b[0], setNumber = _b[1];
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", null,
            "Number: ",
            number),
        React.createElement("button", { onClick: function () { return setNumber(function (number) { return number + 1; }); } }, "Click"),
        React.createElement("button", { onClick: function () { return resolve("woah: " + number); } }, "Finish it")));
}
//# sourceMappingURL=UI.js.map