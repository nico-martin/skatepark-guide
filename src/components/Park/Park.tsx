import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Button, FullLoader, LazyImage, Loader, Message } from '@theme';
import { PARK_API_STATES, usePark } from '@common/hooks/usePark';
import { GeoDataI } from '@common/types/parks';
import cn from '@common/utils/classnames';
import ParkAttributesEdit from '@comp/Park/ParkAttributesEdit';
import ParkContact from '@comp/Park/ParkContact';
import ParkContactEdit from '@comp/Park/ParkContactEdit';
import ParkGallery from '@comp/Park/ParkGallery';
import ParkHeader from '@comp/Park/ParkHeader';
import ParkPositionEdit from '@comp/Park/ParkPositionEdit';
import ParkTitle from '@comp/Park/ParkTitle';
import ParkVideo from '@comp/Park/ParkVideo';
import ParkWeather from '@comp/Park/ParkWeather';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import styles from './Park.css';

const Park = ({
  className = '',
  edit,
}: {
  className?: string;
  edit?: boolean;
}) => {
  const [scroll, setScroll] = React.useState<number>(0);
  const { slug } = useParams<{ slug: string }>();
  const { data, state, error, setPark, hasUnsavedChanges, updatePark } =
    usePark(slug);
  const { formatMessage } = useIntl();
  const isEdtitable: boolean = edit && data?.canEdit;

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
                className={cn(styles.contentElement)}
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
              <div className={cn(styles.editControls)}>
                <Button
                  disabled={
                    state === PARK_API_STATES.UPDATING || !hasUnsavedChanges
                  }
                  isLoading={state === PARK_API_STATES.UPDATING}
                  onClick={updatePark}
                >
                  {formatMessage({
                    id:
                      data.status === 'private'
                        ? 'park.edit.publish'
                        : 'park.edit.saveChanges',
                  })}
                </Button>
              </div>
            )}
          </React.Fragment>
        )}
      </main>
    </article>
  );
};

export default Park;
