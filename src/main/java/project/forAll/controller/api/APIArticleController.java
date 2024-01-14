package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.forAll.domain.board.Article;
import project.forAll.form.ArticleForm;
import project.forAll.service.ArticleService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class APIArticleController extends APIController {

    private final ArticleService articleService;

    /**
     * id에 해당하는 article 객체를 반환
     *
     * @param id article의 id
     * @return article 객체
     */
    @GetMapping("/articles/{id}")
    public ResponseEntity getArticle(@PathVariable("id") final Long id){
        final Article article = (Article) articleService.findById(id);

        return article == null ? new ResponseEntity(errorResponse("No article found for id " + id), HttpStatus.NOT_FOUND)
                : new ResponseEntity(article, HttpStatus.OK);
    }

    /**
     * 게시글 등록 페이지
     * @param af
     * @return articleId
     */
    @PostMapping("/articles/")
    public ResponseEntity createArticle(@RequestBody final ArticleForm af) {
        try {
            final Article article = articleService.createArticle(af);
            final Long articleId = articleService.saveArticle(article);

            return new ResponseEntity(Long.toString(articleId), HttpStatus.OK);
        } catch(final Exception e) {
            return new ResponseEntity(errorResponse("Could not create article : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

//    @PutMapping("/articles")
//    public ResponseEntity editArticle(@RequestBody final ArticleForm form, HttpServletRequest request){
//        try{
//            // ArticleForm으로부터 Article을 받아오는 코드를 잘 모르겠어서 수정 부탁드려요!
//            final Article savedArticle = articleService.findById(form.getId());
//            if (savedArticle == null) throw new Exception("No article " + form.getId());
//
//            final Article article = articleService.createArticle(form);
//            article.setId(savedArticle.getId());
//            articleService.save(article);

//            return new ResponseEntity(article, HttpStatus.OK);
//        } catch(final Exception e) {
//            return new ResponseEntity(errorResponse("Could not update Article : "+ e.getMessage()), HttpStatus.BAD_REQUEST);
//        }
//    }
}
