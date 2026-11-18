// Button status
buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);

  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}

// End button status

// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();

    const keyword = e.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// End Form Search

// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");

if (buttonPagination.length > 0) {
  let url = new URL(window.location.href);

  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}

// End Pagination

// CheckBoxMulti
const CheckBoxMulti = document.querySelector("[checkbox-multi]");
if (CheckBoxMulti) {
  const inputCheckAll = document.querySelector("input[name='checkall']");
  const inputsID = document.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsID.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsID.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsID.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = document.querySelectorAll(
        "input[name='id']:checked",
      ).length;
      if (countChecked === inputsID.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End CheckBoxMulti

// Form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (event) => {
    event.preventDefault();

    const CheckBoxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = document.querySelectorAll("input[name='id']:checked");

    if (inputChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputChecked.forEach((input) => {
        const id = input.value;
        ids.push(id);
      });

      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("Vui long chon it nhat 1 ban ghi!");
    }
  });
}

// End Form-change-multi
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");

  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm!");

      if (isConfirm === true) {
        const idDelete = button.getAttribute("data-id");

        const action = `${path}/${idDelete}?_method=DELETE`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
// Delete Product
