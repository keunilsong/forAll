
package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import project.forAll.domain.member.Profile;


import java.util.List;

@Getter @Setter
@NoArgsConstructor
public class ProfileForm {


    private Long id;
    // 사용자
    private String userId;
    // 한 줄 소개
    private String introduction;
    // 프로필 사진
    private String profilePhoto;


    // MBTI
    private String mbti;
    // 요리
    private List<String> cook;


    // 요리재료
    private List<String> cookItem;

    public static ProfileForm pf(Profile profile){
        final ProfileForm pf = new ProfileForm();
        pf.setId(profile.getId());
        pf.setUserId(profile.getMember().getLoginId());
        pf.setIntroduction(profile.getIntroduction());
        pf.setProfilePhoto(profile.getProfilePhoto());
        pf.setMbti(profile.getMbti());
        pf.setCook(profile.getCook());
        pf.setCookItem(profile.getCookItem());



        return pf;
    }

}
