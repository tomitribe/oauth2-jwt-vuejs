export function b64u_2_b64(str) {
    if (typeof str !== "string") {
        throw new Error("Illegal parameter specified!");
    }
    str = str
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    if (str.length % 4 === 1) {
        throw new Error("Illegal base64url string!");
    }
    for (; (str.length % 4 !== 0);) {
        str = str + "=";
    }
    return str;
}

export function b64_2_b64u(str) {
    if (typeof str !== "string") {
        throw new Error("Illegal parameter specified!");
    }
    return str
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}

export function b64u_2_str(str) {
    return atob(b64u_2_b64(str));
}

export function unzip(str) {
    if (typeof str !== "string") {
        throw new Error("Illegal parameter specified!");
    }
    var b64 = b64u_2_b64(str),
        zipStr = atob(b64);
    return pako.inflate(zipStr, {raw: false, from: 'string', to: 'string'});
}

export function jwtSplit(str) {
    if (typeof str !== "string") {
        throw new Error("Illegal parameter specified!");
    }
    var jwt = str.split('.');
    if (jwt.length !== 3) {
        throw new Error("Illegal jwt string!");
    }
    return {
        header: jwt[0],
        payload: jwt[1],
        signature: jwt[2]
    };
}

export function jwtDecode(str) {
    if (typeof str !== "string") {
        throw new Error("Illegal parameter specified!");
    }
    var jwt = jwtSplit(str);

    jwt.header = JSON.parse(b64u_2_str(jwt.header));

    if (typeof jwt.header['zip'] === 'string' && jwt.header['zip'].toUpperCase() === 'GZIP') {
        jwt.payload = JSON.parse(unzip(jwt.payload));
    } else {
        jwt.payload = JSON.parse(b64u_2_str(jwt.payload));
    }

    return {
        header: jwt.header,
        payload: jwt.payload,
        signature: jwt.signature
    };
}
