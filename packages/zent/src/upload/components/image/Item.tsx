import * as React from 'react';
import cn from 'classnames';
import { IImageUploadItemProps } from '../../types';
import { FILE_UPLOAD_STATUS } from '../../constants';
import { Progress } from '../../../progress';
import { Icon } from '../../../icon';
import { useHover } from '../../../utils/hooks/use-hover';
import { useItemHandler } from '../../hooks/item-handler';

/**
 * 通用上传组件上传项
 */
const ImageUploadItem: React.FC<IImageUploadItemProps> = props => {
  const { i18n, item } = props;
  const isFailed = item.status === FILE_UPLOAD_STATUS.failed;

  const { isHover, onMouseEnter, onMouseLeave } = useHover();

  const { deleteHandler, retryHandler } = useItemHandler(props);

  const cls = cn('zent-image-upload-item', {
    ['zent-image-upload-item__failed']: isFailed,
    ['zent-image-upload-item__hover']: isHover,
  });

  // 上传失败的状态和操作显示
  const failedFallback = React.useMemo(() => {
    const failedIconType = isHover ? 'upload' : 'warning';
    const failedText = isHover ? i18n.retry : i18n.failed;
    const failedCls = cn(
      'zent-image-upload-item-backdrop',
      'zent-image-upload-item-backdrop__white',
      {
        ['zent-image-upload-item-backdrop__failed']: !isHover,
        ['zent-image-upload-item-backdrop__retry']: isHover,
      }
    );
    return (
      isFailed && (
        <div className={failedCls} onClick={retryHandler}>
          <Icon
            className="zent-image-upload-item__icon"
            type={failedIconType}
          />
          <span className="zent-image-upload-item-backdrop-text">
            {failedText}
          </span>
        </div>
      )
    );
  }, [isHover, i18n, isFailed]);

  return (
    <li
      key={item._id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cls}
    >
      <img
        className="zent-image-upload-item__thumb"
        src={item.thumbSrc || item.src}
        alt={item.name}
      />
      {/* 上传中的状态显示 */}
      {item.status === FILE_UPLOAD_STATUS.uploading && (
        <div className="zent-image-upload-item-backdrop zent-image-upload-item-backdrop__black">
          <Progress
            width={48}
            showInfo={false}
            className="zent-image-upload-item__progress"
            strokeWidth={8}
            percent={item.percent}
          />
        </div>
      )}
      {failedFallback}
      <Icon
        type="close-circle"
        className="zent-image-upload-item__delete"
        onClick={deleteHandler}
      />
    </li>
  );
};

export default ImageUploadItem;
