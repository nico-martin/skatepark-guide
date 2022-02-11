import React from 'react';
import { useIntl } from 'react-intl';
import { FullLoader, Message } from '@theme';
import ParkAttributesEdit from '@components/Park/ParkAttributesEdit';
import ParkContact from '@components/Park/ParkContact';
import ParkContactEdit from '@components/Park/ParkContactEdit';
import ParkEditControls from '@components/Park/ParkEditControls';
import ParkGallery from '@components/Park/ParkGallery';
import ParkHeader from '@components/Park/ParkHeader';
import ParkPositionEdit from '@components/Park/ParkPositionEdit';
import ParkTitle from '@components/Park/ParkTitle';
import ParkVideo from '@components/Park/ParkVideo';
import ParkWeather from '@components/Park/ParkWeather';
import { PARK_API_STATES, usePark } from '@common/hooks/usePark';
import { GeoDataI } from '@common/types/parks';
import cn from '@common/utils/classnames';
import styles from './Park.module.css';

const Park = ({
  className = '',
  edit,
  slug,
}: {
  className?: string;
  edit?: boolean;
  slug: string;
}) => {
  const [scroll, setScroll] = React.useState<number>(0);

  const { data, state, error, setPark, hasUnsavedChanges, updatePark } =
    usePark(String(slug));
  const { formatMessage } = useIntl();
  const isEdtitable: boolean = edit && data?.canEdit;
  const editorRef = React.useRef<{ CKEditor: any; ClassicEditor: any }>();
  const { CKEditor, ClassicEditor } = editorRef.current || {
    CKEditor: null,
    ClassicEditor: null,
  };

  React.useEffect(() => {
    if (edit && !editorRef.current) {
      editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
        ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
      };
    }
  }, [edit]);

  return (
    <article
      className={cn(className, styles.root)}
      onScroll={(e) => setScroll((e.target as HTMLElement).scrollTop)}
    >
      <ParkHeader
        className={cn(styles.header)}
        park={data}
        setPark={setPark}
        scroll={scroll}
        edit={isEdtitable}
        slug={data?.slug || null}
      />
      <ParkTitle
        title={data?.title || ''}
        setTitle={
          isEdtitable
            ? (title) =>
                setPark({
                  title,
                })
            : null
        }
        className={cn(styles.title)}
      />
      <main
        className={cn(styles.main, {
          [styles.mainEdit]: edit,
        })}
      >
        {state === PARK_API_STATES.LOADING ? (
          <FullLoader large spacingTop />
        ) : state === PARK_API_STATES.ERROR ? (
          <div className={cn(styles.contentElement)}>
            <Message type="error">error: {error}</Message>
          </div>
        ) : edit && !data.canEdit ? (
          <div className={cn(styles.contentElement)}>
            <Message type="error">
              {formatMessage({ id: 'park.edit.permission' })}
            </Message>
          </div>
        ) : (
          <React.Fragment>
            {(edit || Boolean(data.video)) && (
              <ParkVideo
                className={cn(styles.video, styles.contentElement)}
                videoLink={data.video}
                setVideoLink={
                  isEdtitable
                    ? (value) =>
                        setPark({
                          video: value,
                        })
                    : null
                }
              />
            )}
            {(edit || Boolean(data.gallery)) && (
              <ParkGallery
                className={cn(styles.gallery, styles.contentElement)}
                images={data.gallery || []}
                slug={data.slug || null}
                setImages={
                  isEdtitable
                    ? (gallery) =>
                        setPark({
                          gallery,
                        })
                    : null
                }
              />
            )}
            {edit ? (
              <div className={cn(styles.content, styles.contentElement)}>
                <CKEditor
                  editor={ClassicEditor}
                  data={data.content}
                  onChange={(event, editor) =>
                    setPark({ content: editor.getData() })
                  }
                  config={{
                    toolbar: [
                      'heading',
                      '|',
                      'bold',
                      'italic',
                      'link',
                      'bulletedList',
                      'numberedList',
                    ],
                    heading: {
                      options: [
                        {
                          model: 'paragraph',
                          title: 'Paragraph',
                          class: 'ck-heading_paragraph',
                        },
                        {
                          model: 'heading2',
                          view: 'h2',
                          title: 'Heading 2',
                          class: 'ck-heading_heading2',
                        },
                      ],
                    },
                  }}
                />
              </div>
            ) : Boolean(data.content) ? (
              <div
                className={cn(styles.content, styles.contentElement)}
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            ) : null}
            {Object.keys(data.contact).length !== 0 &&
              (edit ? (
                <ParkContactEdit
                  contacts={data.contact}
                  className={cn(styles.contact, styles.contentElement)}
                  setContacts={(contact) => setPark({ contact })}
                />
              ) : (
                <ParkContact
                  contacts={data.contact}
                  className={cn(styles.contact, styles.contentElement)}
                />
              ))}
            {edit && (
              <ParkAttributesEdit
                anlage={data.anlage}
                className={cn(styles.contentElement)}
                facilities={data.facilities || {}}
                setValues={(anlage, facilities) =>
                  setPark({ facilities, anlage })
                }
              />
            )}
            {edit && (
              <ParkPositionEdit
                className={cn(
                  styles.contentElement,
                  styles.contentElementPosition
                )}
                position={data.map}
                onUpdatePosition={(map: GeoDataI) => setPark({ map })}
              />
            )}
            {!edit && (
              <ParkWeather
                className={cn(styles.weather, styles.contentElement)}
                slug={data.slug}
              />
            )}
            {edit && (
              <ParkEditControls
                className={cn(styles.editControls)}
                updatePark={updatePark}
                data={data}
                hasUnsavedChanges={hasUnsavedChanges}
                parkState={state}
              />
            )}
          </React.Fragment>
        )}
      </main>
    </article>
  );
};

export default Park;
