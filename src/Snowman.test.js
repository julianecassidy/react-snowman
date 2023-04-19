import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";
import "./Snowman.css";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";

const images = [img0, img1, img2, img3, img4, img5, img6];
const words = ["testwordone", "testwordtwo"]
const maxWrong = 6;

test("there are the same number images as max allowed guesses", function () {
    expect(maxWrong).toEqual(images.length - 1);
})

test("does not allow guesses after max wrong guesses met", function () {
    const { container, debug } = render(
        <Snowman 
          images={ images }
          words={ words }
          maxWrong={ maxWrong } 
        />
    );

    // expect img0 to show and nWrong to be 0
    let img = container.querySelector("img");
    expect(
        img.getAttribute("alt")).toEqual(String(0));
    expect(
        container.querySelector(".Snowman-nWrong")
    ).toContainHTML("Wrong Guesses: 0");

    // make 6 wrong guesses
    fireEvent.click(container.querySelector("[value='a']"));
    fireEvent.click(container.querySelector("[value='b']"));
    fireEvent.click(container.querySelector("[value='c']"));
    fireEvent.click(container.querySelector("[value='g']"));
    fireEvent.click(container.querySelector("[value='h']"));
    fireEvent.click(container.querySelector("[value='f']"));

    // expect the last image to show, nWrong to be equal to maxWrong, the keyboard
    // not to show, and text to say "You Lose"
    img = container.querySelector("img");
    expect(
        img.getAttribute("alt")).toEqual(String(maxWrong));
    expect(
        container.querySelector(".Snowman-nWrong")
    ).toContainHTML(`Wrong Guesses: ${maxWrong}`);
    expect(
        container.querySelector(".hidden")
    ).toBeInTheDocument();
    expect(
        container.querySelector(".Snowman-outcome-message")
    ).toBeInTheDocument();
})