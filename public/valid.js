//valid.js
//유효성 검사를 사용하는 곳이 여러개이므로, 각각 그에 맞춰서 복붙 및 수정을 하게 되면 다른 것과 달라질 가능성이 충분히 있다.
//회원가입, 

//다음에 유효성검사 함수 만들때는 require(필수) 파라미터를 이용하여 이 항목은 필수인지 안필수인지 구분할 수 있도록 할것.
function id_valid(id, options = {require:true, check: true}) {
    var reg = /^[0-9a-zA-Z_]+$/;
    var id_value = id.val();
    //원래 ajax로 해결해야함. 아랫방법은 서버 없이 하는 것이니 임시로.
    /*$.ajax({
        url: url,
        type: type,
        data: data,
        success: function (response) {
            $(".modal").html(response);
            $("")
        },
        error: function (request, status, error) {
            console.error(error);
        },
        complete: function () {
        }
    });*/
    if (id_value.length >= 5 && id_value.length <= 15) {
        if (reg.test(id_value)) {
            if(options.check == true) {
                for (var i = 0; i < user_info.length; i++) {
                    if (user_info[i].id == id_value) {
                        id.siblings(".invalid-feedback").text("아이디가 중복됩니다");
                        id.removeClass("is-valid").addClass("is-invalid");
                        return false;
                        break;
                    }
                }
            }
            //id.siblings(".valid-feedback").text("이 아이디를 사용하셔도 됩니다.");
            id.removeClass("is-invalid").addClass("is-valid");
            return true;
        } else {
            id.siblings(".invalid-feedback").text("아이디 형식에 맞지 않습니다.");
            id.removeClass("is-valid").addClass("is-invalid");
        }
    } else if (id_value.length < 6) {
        id.siblings(".invalid-feedback").text("5자리 이상 사용가능합니다");
        id.removeClass("is-valid").addClass("is-invalid");
        return false;
    } else if (id_value.length > 15) {
        id.siblings(".invalid-feedback").text("15자리 까지 사용가능합니다");
        id.removeClass("is-valid").addClass("is-invalid");
        return false;
    }

}

function email_valid(email, options = {require: true, specificemail: undefined}) {
    if(options.specificemail != undefined) {
        //특정 이메일만 허용할 수 있도록 막는 과정이 필요함
        //방법은 많음, 정규식, indexOf()
        //var exp = 
    }
    var email_value = email.val();
    if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(email_value)) {
        email.siblings(".invalid-feedback").text("이메일 형식이 올바르지 않습니다.");
        email.removeClass("is-valid").addClass("is-invalid");
        return false;
    } else {
        email.removeClass("is-invalid").addClass("is-valid");
        return true;
    }
}
function password_valid(password) {
    var password_value = password.val();
    if (password_value != "") {
        if (password_value.length >= 8 && password_value.length <= 20) {
            if (/\s/.test(password_value)) {
                password.siblings(".invalid-feedback").text("비밀번호는 공백없이 입력해야 합니다.");
                password.removeClass("is-valid").addClass("is-invalid");
                return false;
            } else if ((/[0-9]/g.test(password_value) + /[a-z]/gi.test(password_value) + /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi.test(password_value)) < 2) {//true값이 1을 가지기 때문에 가능한 계산
                password.siblings(".invalid-feedback").text("영문, 숫자, 특수문자 중 2가지 이상을 사용해야 합니다.");
                password.removeClass("is-valid").addClass("is-invalid");
                return false;
            } else {
                password.removeClass("is-invalid").addClass("is-valid");
                return true;
            }
        } else if (password_value.length < 8) {
            password.siblings(".invalid-feedback").text("8자리 이상 입력해야 합니다.");
            password.removeClass("is-valid").addClass("is-invalid");
            return false;
        } else if (password_value.length > 20) {
            password.siblings(".invalid-feedback").text("최대 20자까지 입력가능합니다.");
            password.removeClass("is-valid").addClass("is-invalid");
            return false;
        }
    }
}

function passwordr_valid(password, passwordr) {
    var passwordr_value = passwordr.val();
    if (password.val() != passwordr_value) {
        passwordr.siblings(".invalid-feedback").text("비밀번호가 서로 일치하지 않습니다");
        passwordr.removeClass("is-valid").addClass("is-invalid");
        return false;
    } else if ($("#password_input").val() == "") {
        passwordr.siblings(".invalid-feedback").text("비밀번호 항목이 비어있습니다.");
        passwordr.removeClass("is-valid").addClass("is-invalid");
        return false;
    } else {
        passwordr.removeClass("is-invalid").addClass("is-valid");
        return true;
    }
}
function passwordo_valid(passwordo) {
    var passwordo_value = passwordo.val();
    if (passwordo_value == "") {
        passwordo.siblings(".invalid-feedback").text("이전 비밀번호를 입력해야 합니다");
        passwordo.removeClass("is-valid").addClass("is-invalid");
        return false;
    }
}

function nickname_valid(nickname) {
    var nickname_value = nickname.val();
    if (nickname_value.length >= 2 && nickname_value.length <= 15) {
        if (/\s/.test(nickname_value)) {
            nickname.siblings(".invalid-feedback").text("닉네임은 공백없이 입력해야 합니다.");
            nickname.removeClass("is-valid").addClass("is-invalid");
            return false;
        } else {
            nickname.removeClass("is-invalid").addClass("is-valid");
            return true;
        }
    } else if (nickname_value.length < 2) {
        nickname.siblings(".invalid-feedback").text("2자리 이상 입력해야 합니다.");
        nickname.removeClass("is-valid").addClass("is-invalid");
        return false;
    } else if (nickname_value.length > 15) {
        nickname.siblings(".invalid-feedback").text("최대 15자까지 입력가능합니다.");
        nickname.removeClass("is-valid").addClass("is-invalid");
        return false;
    }
}

function pwfinda_valid(pwfinda) {
    var pwfinda_input = pwfinda.val();
    if ($("#pwfind_select option:selected").val() == ("" || undefined || null)) {
        pwfinda.siblings(".invalid-feedback").text("비밀번호 찾기 질문이 정해지지 않았습니다.");
        pwfinda.removeClass("is-valid").addClass("is-invalid");
        return false;
    } else if (pwfinda_input == "") {
        pwfinda.siblings(".invalid-feedback").text("비밀번호 찾기 답을 입력하셔야 합니다.");
        pwfinda.removeClass("is-valid").addClass("is-invalid");
        return false;
    } else {
        pwfinda.removeClass("is-invalid").addClass("is-valid");
        return true;
    }
}

var file;
$("#img_uploader").change(function (e) {
    var img_uploader = $(this);
    var myFile = $(this).prop('files');
    file = myFile[0];
    const image_type = ['image/gif', 'image/jpeg', 'image/png'];

    if (file.size >= 1024 * 1024 * 5) {
        img_uploader.siblings(".invalid-feedback").text("5MB이상인 파일은 업로드 할 수 없습니다.");
        img_uploader.removeClass("is-valid").addClass("is-invalid");
        return false;
    }
    if (image_type.includes(file.type)) {
        image_preview(file);
        img_uploader.removeClass("is-invalid").addClass("is-valid");
        return true;
    } else {
        img_uploader.siblings(".invalid-feedback").text("이미지 파일만 업로드 할 수 있습니다.");
        img_uploader.removeClass("is-valid").addClass("is-invalid");
        return false;
    }
})
var img_url = undefined;
function image_preview(file) {
    var reader = new FileReader();
    reader.onload = (function (f) {
        return function (e) {
            img_url = e.target.result;
            var $div = $('<div class="thumb"><div class="close">X</div><img src="' + img_url + '" title="' + escape(f.name) + '" style="height:80px;width:auto;" class="rounded-circle"></div>');
            $("#thumbnails").html($div);
            f.target = $div;
        };
    })(file);
    reader.readAsDataURL(file);
}
$("#thumbnails").on("click", ".close", function (e) {
    var $target = $(e.target);
    file.upload = 'disable';
    $target.parent().remove();
});
function pwfindc_valid(pwfindc, require = true) {
    var pwfindc_input = $("#pwfindc_input");
    if ($("#pwfind_select").val() == "4" && require == true) {//이때만 유효성 검사
        if (pwfindc == "") {
            pwfindc_input.siblings(".invalid-feedback").text("비밀번호 찾기 질문이 정해지지 않았습니다.");
            pwfindc_input.removeClass("is-valid").addClass("is-invalid");
            return false;
        } else {
            pwfindc_input.removeClass("is-invalid").addClass("is-valid");
            return true;
        }
    } else {
        return true;
    }
}
function findUser(data, callback) {
    var i;
    for (i = 0; i < user_info.length; i++) {
        if (data == user_info[i]) {
            break;
        }
    }
    if(i > user_info.length) {
        i = undefined;
    }
    if (typeof callback === 'function') {
        callback(i);
    }
    return undefined;
}
function findUserById(data, callback) {
    var i;
    for (i = 0; i < user_info.length; i++) {
        if ((typeof data == "object" ? datadata.val() : data) == user_info[i].id) {
            break;
        }
    }
    if(i >= user_info.length) {
        i = undefined;
    }
    if (typeof callback === 'function') {
        callback(i);
    }
    return undefined;
}