import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COLUMN } from "../lib/constants";
import Component from "./Component";
import DropZone from "./DropZone";

const style = {};
const Column = ({ data,layout, components, handleDrop, path,showId }) => {
  const ref = useRef(null);
  // console.log("Column Added");
  // console.log(layout.length);
  // let child = layout[0].children
  // console.log(child.length);
  // if(layout)

    // var len = layout.length;
    // for (let i = 0; i <= len; i++) {
    //   if (i === len) {
    //     console.log(layout[len - 1].children[0].id);
    //   }
    // }

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: COLUMN,
      id: data.id,
      children: data.children,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderComponent = (component, currentPath) => {
    return (
      <Component
        key={component.id}
        data={component}
        components={components}
        path={currentPath}
        showId={showId}
      />
    );
  };

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="base draggable column"
      onClick={(e)=>{showId(data.id,e);}}
    >
      {data.id}
      {data.children.map((component, index) => {
        const currentPath = `${path}-${index}`;

        return (
          <React.Fragment key={component.id}>
            <DropZone
              data={{
                path: currentPath,
                childrenCount: data.children.length,
              }}
              onDrop={handleDrop}
            />
            {renderComponent(component, currentPath)}
          </React.Fragment>
        );
      })}
      <DropZone
        data={{
          path: `${path}-${data.children.length}`,
          childrenCount: data.children.length,
        }}
        onDrop={handleDrop}
        isLast
      />
    </div>
  );
};
export default Column;
