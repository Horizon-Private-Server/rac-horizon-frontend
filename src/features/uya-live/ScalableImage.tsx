import React, { useRef, useEffect } from 'react';
import { Image as KonvaImage, Transformer } from 'react-konva';
import Konva from 'konva'; // Import Konva types

// Define the type for the props (renamed to reflect no dragging)
interface ScalableImageProps {
  image: HTMLImageElement | undefined;
  isSelected: boolean;
  onSelect: () => void;
  onTransformEnd: (attrs: { x: number; y: number; width: number; height: number }) => void;
}

const ScalableImage: React.FC<ScalableImageProps> = ({ image, isSelected, onSelect, onTransformEnd }) => {
  const shapeRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      // Attach transformer to the current shape
      trRef.current.nodes([shapeRef.current]);
      const layer = trRef.current.getLayer();
      if (layer) {
        layer.batchDraw();
      }
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        ref={shapeRef}
        image={image}
        x={10}  // Initial X position
        y={10}  // Initial Y position
        width={322}  // Initial width for background or player
        height={213}  // Initial height for background or player
        onClick={onSelect}  // Click to select for resizing
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          if (node) {
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            // Reset the scale to 1 to prevent double-scaling
            node.scaleX(1);
            node.scaleY(1);

            onTransformEnd({
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),  // Update the width
              height: Math.max(5, node.height() * scaleY),  // Update the height
            });
          }
        }}
        onTransform={() => {
          const node = shapeRef.current;
          if (node) {
            // Live update scale
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.width(node.width() * scaleX);
            node.height(node.height() * scaleY);
            node.scaleX(1);
            node.scaleY(1);
          }
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit resizing to a minimum size
            if (newBox.width < 50 || newBox.height < 50) {
              return oldBox;
            }
            return newBox;
          }}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']} // Only allow resizing
          resizeEnabled={true}
          rotateEnabled={false}  // Disable rotation
        />
      )}
    </>
  );
};

export default ScalableImage;
