package project.forAll.controller.api.member;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import project.forAll.controller.SessionManager;
import project.forAll.controller.api.APIController;
import project.forAll.domain.member.Member;
import project.forAll.form.LoginForm;
import project.forAll.service.MemberService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class APILoginController extends APIController {

    private final MemberService memberService;
    private final SessionManager sessionManager;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody final LoginForm loginForm,HttpServletRequest request, HttpServletResponse response) {

        Member loginMember = memberService.findByLoginIdAndLoginPw(loginForm.getLoginId(), loginForm.getLoginPw());

        try {
            if (loginMember == null) throw new Exception(loginForm.getLoginId());

            // 문제 없다면 삭제할 코드
//            HttpSession session = request.getSession();
//            session.setAttribute(SessionConst.LOGIN_MEMBER, loginMember);
            sessionManager.createSession(loginMember.getLoginId(), response);

            return new ResponseEntity(loginMember, HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity(errorResponse("Could not find member : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        sessionManager.expire(request);

        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }
}
