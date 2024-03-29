package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.board.Article;
import project.forAll.domain.board.Comment;
import project.forAll.domain.board.ReComment;
import project.forAll.form.CommentForm;
import project.forAll.form.ReCommentForm;
import project.forAll.repository.board.CommentRepository;
import project.forAll.repository.board.ReCommentRepository;

import java.util.List;

@Component
@Transactional(readOnly = true)
public class ReCommentService extends Service{

    @Autowired
    private ReCommentRepository recommentRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private MemberService memberService;

    @Override
    protected JpaRepository getRepository() {
        return recommentRepository;
    }

    @Transactional
    public Long saveReComment(ReComment recomment) {
        save(recomment);
        return recomment.getId();
    }
    /**
     * ReCommentForm으로 recomment 생성
     * @param form
     * @return recomment
     */
    @Transactional
    public ReComment build(final ReCommentForm form) {
        final ReComment recomment = new ReComment();
        if (form.getId() != null) recomment.setId(form.getId());
        recomment.setComment(commentRepository.findById(form.getCommentId()).orElseThrow(() -> new IllegalArgumentException("comment doesn't exist")));
        recomment.setText(form.getText());
        recomment.setWrittenAt(form.getWrittenAt());
        recomment.setWrittenBy(memberService.findByLoginId(form.getUserId()));

        return recomment;
    }

    @Transactional
    public  ReCommentForm of(final ReComment recomment, String userId){
        final ReCommentForm form = new ReCommentForm();
        form.setId(recomment.getId());
        form.setCommentId(recomment.getComment().getId());
        form.setText(recomment.getText());
        form.setWrittenAt(recomment.getWrittenAt());
        form.setUserId(recomment.getWrittenBy().getLoginId());
        form.setRecommend(recomment.getRecommend().size());
        if(userId != null){
            final Long userLongId = memberService.findByLoginId(userId).getId();
            form.setRecommendAble(recomment.getRecommend().contains(userLongId));
        }
        return form;
    }

    @Transactional
    public List<ReComment> findByComment(final Long commentId){
        final Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new IllegalArgumentException("comment doesn't exist"));
        return recommentRepository.findByComment(comment);
    }
}
