import React, { useState } from 'react';
import { Modal, Carousel } from 'antd';

export interface ImagePreviewProps {
  urls: string | string[];
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ ...props }) => {
  const [visible, setVisible] = useState(false);

  const viewimage = () => {
    let urls: string[] = [];
    if (Array.isArray(props.urls)) {
      urls = props.urls;
    } else {
      if (props.urls) {
        urls = props.urls.split(',');
      }
    }

    return urls.map(url => <img src={url} key={url} width={40} height={40} />);
  };

  const viewimageNew = () => {
    let urls: string[] = [];
    if (Array.isArray(props.urls)) {
      urls = props.urls;
    } else {
      if (props.urls) {
        urls = props.urls.split(',');
      }
    }
    return urls.map(url => <img src={url} key={url} height={340} />);
  };

  const handleCancel = () => setVisible(false);

  const handleView = () => setVisible(true);
  return (
    <div>
      <div onClick={handleView}>{viewimage()}</div>
      <Modal visible={visible} footer={null} onCancel={handleCancel} width={700}>
        <Carousel infinite speed={100} autoplay>
          {viewimageNew()}
        </Carousel>
      </Modal>
    </div>
  );
};

export default ImagePreview;
