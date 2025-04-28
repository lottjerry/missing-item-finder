<template>
  <v-container
    class="fill-height d-flex justify-center align-center"
    max-width="900"
  >
    <div class="w-75">
      <v-img class="mb-4" height="100" src="@/assets/logo.png" />

      <div class="mb-8 text-center">
        <h1 class="text-h3 font-weight-bold">Missing Item Finder</h1>
        <v-btn @click="newFile" class="mt-5" v-if="jsonData" color="primary"
          >New File</v-btn
        >
      </div>

      <div class="d-flex ga-5" v-if="jsonData">
        <v-card
          class="bg-black pa-3 w-75 overflow-auto"
          height="600"
          variant="outlined"
        >
          <v-card
            class="ma-3 pa-3 cursor-pointer"
            v-for="(item, index) in jsonData.size_totals"
            :key="index"
            @click="selectItem = index"
            :color="selectItem === index ? 'primary' : true"
          >
            <p>Size: {{ index }}</p>
            <p>Total: {{ item }}</p>
          </v-card>
        </v-card>
        <v-data-table-virtual
          height="500"
          class="pa-5"
          :items="items"
          hide-default-footer
          fixed-header
        ></v-data-table-virtual>
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
import { ref, watch } from "vue";
import axios from "axios";

const jsonData = ref(null);
const error = ref(null);
const selectItem = ref(null);
const items = ref([]);

const newFile = () => {
  jsonData.value = null;
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      "https://missing-item-finder-api.onrender.com/upload-csv/",
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
    alert(error);
  }
};

watch(selectItem, async (newSelectItem) => {
  items.value = Object.keys(
    jsonData.value.size_details[newSelectItem].Description
  ).map((key) => ({
    description: jsonData.value.size_details[newSelectItem].Description[key],
    units: jsonData.value.size_details[newSelectItem].Units[key],
  }));
});
</script>
