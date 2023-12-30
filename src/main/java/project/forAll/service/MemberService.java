package project.forAll.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.forAll.domain.Member;
import project.forAll.repository.MemberRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Long join(Member member) {
        // validateDuplicateMember(member);
        memberRepository.save(member);
        return member.getId();
    }

    /* 중복 회원을 구별하는 방법 (전화번호? 이름과 생년월일?)
    private void validateDuplicateMember(Member member) {
        List<Member> findMembers = memberRepository.findByNum(member.getNum())
    }
     */

    /* 필요하다면 admin 사이트를 위해서??
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }
     */

    public Member findOne(Long memberId) {
        return memberRepository.findOne(memberId);
    }
}
