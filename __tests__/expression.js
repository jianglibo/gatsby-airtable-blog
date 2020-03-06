import React from "react"

describe("Expression", () => {
  it("switch is an expression", () => {
    let a;
    switch (1) {
        case 1:
            a = 0
            break;
        default:
            a = 1
            break;
    }

    expect(a).toBe(0)
  })
})