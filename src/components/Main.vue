<template>
  <v-container
    class="fill-height d-flex justify-center align-center"
    max-width="900"
  >
    <div>
      <v-img class="mb-4" height="150" src="@/assets/logo.png" />

      <div class="mb-8 text-center">
        <h1 class="text-h2 font-weight-bold">Missing Item Finder</h1>
      </div>
      <div>
        <div v-if="jsonData">
          <pre>{{ JSON.stringify(jsonData, null, 2) }}</pre>
        </div>
        <div v-if="error">{{ error }}</div>
      </div>
      <v-file-upload
        v-if="!jsonData"
        type="file"
        @change="handleFileUpload"
        accept=".csv"
        show-size
        title="Drag and Drop Here"
        clearable
        scrim="primary"
      >
        <template v-slot:clear="{ props: clearProps }">
          <v-btn color="primary" v-bind="clearProps"></v-btn> </template
      ></v-file-upload>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const jsonData = ref(null);
const error = ref(null);

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      "http://localhost:8000/upload-csv/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    jsonData.value = response.data;
    error.value = null;
  } catch (err) {
    error.value = err.message || "An error occurred";
    jsonData.value = null;
  }
};
</script>
