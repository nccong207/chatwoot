<template>
  <modal :show.sync="show" :on-close="onClose">
    <div class="h-auto overflow-auto flex flex-col">
      <woot-modal-header
        :header-title="$t('CANNED_MGMT.ADD.TITLE')"
        :header-content="$t('CANNED_MGMT.ADD.DESC')"
      />
      <form class="flex flex-col w-full" @submit.prevent="addCannedResponse()">
        <div class="w-full">
          <label :class="{ error: $v.shortCode.$error }">
            {{ $t('CANNED_MGMT.ADD.FORM.SHORT_CODE.LABEL') }}
            <input
              v-model.trim="shortCode"
              type="text"
              :placeholder="$t('CANNED_MGMT.ADD.FORM.SHORT_CODE.PLACEHOLDER')"
              @input="$v.shortCode.$touch"
            />
          </label>
        </div>

        <div class="w-full">
          <label :class="{ error: $v.content.$error }">
            {{ $t('CANNED_MGMT.ADD.FORM.CONTENT.LABEL') }}
          </label>
          <div class="editor-wrap">
            <woot-message-editor
              v-model="content"
              class="message-editor [&>div]:px-1"
              :class="{ editor_warning: $v.content.$error }"
              :enable-variables="true"
              :enable-canned-responses="false"
              :placeholder="$t('CANNED_MGMT.ADD.FORM.CONTENT.PLACEHOLDER')"
              @blur="$v.content.$touch"
            />
          </div>
          <div
            v-if="hasAttachments"
            class="attachment-preview-box"
            @paste="onPaste"
          >
            <attachment-preview
              class="flex-col mt-4"
              :attachments="attachedFiles"
              :remove-attachment="removeAttachment"
            />
          </div>
          <div class="bottom-box">
            <file-upload
              ref="upload"
              v-tooltip.top-end="$t('CONVERSATION.REPLYBOX.TIP_ATTACH_ICON')"
              input-id="cannedAttachment"
              :size="4096 * 4096"
              :accept="allowedFileTypes"
              :multiple="true"
              :drop="true"
              :drop-directory="false"
              :data="{
                direct_upload_url: '/rails/active_storage/direct_uploads',
                direct_upload: true,
              }"
              @input-file="onFileUpload"
            >
              <woot-button
                class-names="button--upload"
                :title="$t('CONVERSATION.REPLYBOX.TIP_ATTACH_ICON')"
                icon="attach"
                emoji="📎"
                color-scheme="secondary"
                variant="smooth"
                size="small"
              />
              <span
                class="text-slate-500 ltr:ml-1 rtl:mr-1 font-medium text-xs dark:text-slate-400"
              >
                {{ $t('NEW_CONVERSATION.FORM.ATTACHMENTS.HELP_TEXT') }}
              </span>
            </file-upload>
          </div>
        </div>
        <div class="flex flex-row justify-end gap-2 py-2 px-0 w-full">
          <woot-submit-button
            :disabled="
              $v.content.$invalid ||
              $v.shortCode.$invalid ||
              addCanned.showLoading
            "
            :button-text="$t('CANNED_MGMT.ADD.FORM.SUBMIT')"
            :loading="addCanned.showLoading"
          />
          <button class="button clear" @click.prevent="onClose">
            {{ $t('CANNED_MGMT.ADD.CANCEL_BUTTON_TEXT') }}
          </button>
        </div>
      </form>
    </div>
  </modal>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

import WootSubmitButton from '../../../../components/buttons/FormSubmitButton.vue';
import Modal from '../../../../components/Modal.vue';
import WootMessageEditor from 'dashboard/components/widgets/WootWriter/Editor.vue';
import alertMixin from 'shared/mixins/alertMixin';
import FileUpload from 'vue-upload-component';
import * as ActiveStorage from 'activestorage';
import AttachmentPreview from 'dashboard/components/widgets/AttachmentsPreview.vue';
import { ALLOWED_FILE_TYPES } from 'shared/constants/messages';
import fileUploadMixin from 'dashboard/mixins/fileUploadMixin';
import { mapGetters } from 'vuex';
import WootButton from '../../../../components/ui/WootButton.vue';

export default {
  components: {
    WootButton,
    WootSubmitButton,
    Modal,
    WootMessageEditor,
    FileUpload,
    AttachmentPreview,
  },
  mixins: [alertMixin, fileUploadMixin],
  props: {
    responseContent: {
      type: String,
      default: '',
    },
    onClose: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      shortCode: '',
      content: this.responseContent || '',
      addCanned: {
        showLoading: false,
        message: '',
      },
      show: true,
      attachedFiles: [],
    };
  },
  computed: {
    ...mapGetters({
      globalConfig: 'globalConfig/get',
    }),
    allowedFileTypes() {
      return ALLOWED_FILE_TYPES;
    },
    hasAttachments() {
      return this.attachedFiles.length;
    },
  },
  validations: {
    shortCode: {
      required,
      minLength: minLength(2),
    },
    content: {
      required,
    },
  },
  mounted() {
    ActiveStorage.start();
  },
  methods: {
    resetForm() {
      this.shortCode = '';
      this.content = '';
      this.$v.shortCode.$reset();
      this.$v.content.$reset();
    },
    getCannedPayload() {
      let cannedPayload = {
        shortCode: this.shortCode,
        content: this.content,
      };

      if (this.attachedFiles && this.attachedFiles.length) {
        cannedPayload.attachments = [];
        this.attachedFiles.forEach(attachment => {
          if (this.globalConfig.directUploadsEnabled) {
            cannedPayload.attachments.push(attachment.blobSignedId);
          } else {
            cannedPayload.attachments.push(attachment.resource.file);
          }
        });
      }

      return cannedPayload;
    },
    addCannedResponse() {
      // Show loading on button
      this.addCanned.showLoading = true;
      const cannedPayload = this.getCannedPayload();
      // Make API Calls
      this.$store
        .dispatch('createCannedResponse', cannedPayload)
        .then(() => {
          // Reset Form, Show success message
          this.addCanned.showLoading = false;
          this.showAlert(this.$t('CANNED_MGMT.ADD.API.SUCCESS_MESSAGE'));
          this.resetForm();
          this.onClose();
        })
        .catch(error => {
          this.addCanned.showLoading = false;
          const errorMessage =
            error?.message || this.$t('CANNED_MGMT.ADD.API.ERROR_MESSAGE');
          this.showAlert(errorMessage);
        });
    },
    attachFile({ blob, file }) {
      const reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onloadend = () => {
        this.attachedFiles.push({
          resource: blob || file,
          thumb: reader.result,
          blobSignedId: blob ? blob.signed_id : undefined,
        });
      };
    },
    removeAttachment(itemIndex) {
      this.attachedFiles = this.attachedFiles.filter(
        (item, index) => itemIndex !== index
      );
    },
    onPaste(e) {
      const data = e.clipboardData.files;
      if (!this.showRichContentEditor && data.length !== 0) {
        this.$refs.messageInput.$el.blur();
      }
      if (!data.length || !data[0]) {
        return;
      }
      data.forEach(file => {
        const { name, type, size } = file;
        this.onFileUpload({ name, type, size, file: file });
      });
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep {
  .ProseMirror-menubar {
    @apply hidden;
  }

  .ProseMirror-woot-style {
    @apply min-h-[12.5rem];

    p {
      @apply text-base;
    }
  }
}
.bottom-box {
  @apply flex py-3 gap-2;
}
</style>
