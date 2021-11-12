import React from 'react';
import cn from '@common/utils/classnames';
import styles from './DropZone.css';

const DropZone = ({
  className = '',
  disabled = false,
  id,
  onChange,
  label = 'Drop files here or click to upload',
}: {
  className?: string;
  disabled?: boolean;
  id: string;
  onChange: (files: FileList) => void;
  label?: string;
}) => {
  const [dragging, setDragging] = React.useState<boolean>(false);
  const uploadArea = React.useRef<HTMLButtonElement>(null);
  const input = React.useRef<HTMLInputElement>(null);

  const onDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragIn = (e: DragEvent) => {
    if (disabled) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const onDragOut = (e: DragEvent) => {
    if (disabled) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const onDrop = (e: DragEvent) => {
    if (disabled) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.items && e.dataTransfer.files.length > 0) {
      onChange(e.dataTransfer.files);
    }
  };

  const onInputChange = (e) => onChange((e.target as HTMLInputElement).files);

  React.useEffect(() => {
    if (uploadArea) {
      const area = uploadArea.current;
      area.addEventListener('dragenter', onDragIn);
      area.addEventListener('dragleave', onDragOut);
      area.addEventListener('dragover', onDrag);
      area.addEventListener('drop', onDrop);
    }

    return () => {
      if (uploadArea) {
        const area = uploadArea.current;
        area.removeEventListener('dragenter', onDragIn);
        area.removeEventListener('dragleave', onDragOut);
        area.removeEventListener('dragover', onDrag);
        area.removeEventListener('drop', onDrop);
      }
    };
  }, [uploadArea]);

  return (
    <button
      ref={uploadArea}
      className={cn(className, styles.root, {
        [styles.isDragging]: dragging,
        [styles.isDisabled]: disabled,
      })}
      onClick={() => (input.current ? input.current.click() : null)}
    >
      <input
        id={id}
        ref={input}
        type="file"
        className={styles.input}
        onChange={onInputChange}
        disabled={disabled}
        multiple={true}
      />
      <span className={styles.label}>{label}</span>
    </button>
  );
};

export default DropZone;
