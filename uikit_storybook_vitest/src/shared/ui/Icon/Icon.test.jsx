
import { render } from "@testing-library/react";
import Icon from "./Icon";

describe("Icon", () => {
  test("should render svg element", () => {
    const { container } = render(<Icon d="M0 0" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test("should apply fill color prop", () => {
    const { container } = render(<Icon d="M0 0" fill="#ff0000" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('fill', '#ff0000');
  });

});
